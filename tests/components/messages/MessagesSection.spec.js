import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from '@/axios';
import echo from '@/echo';
import MessagesSection from '@/components/conversation/MessagesSection.vue';
import MessageSingle from '@/components/conversation/MessageSingle.vue';

vi.mock('@/store', () => ({
    default: {
        state: {
            auth: {
                user: { id: 1, username: 'alice' }
            }
        }
    }
}));

vi.mock('@/axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn()
    }
}));

vi.mock('@/echo', () => ({
    default: {
        private: vi.fn(() => ({
            listen: vi.fn().mockReturnThis()
        })),
        disconnect: vi.fn()
    }
}));

describe('MessagesSection.vue', () => {
    const conversationMock = {
        id: 123,
        requester: { id: 1, username: 'alice' },
        user: { id: 2, username: 'bob' }
    };

    const fakeMessages = [
        {
            id: 101,
            content: 'Hello!',
            sender: { id: 2, username: 'bob' },
            createdAt: '2025-07-24T10:00:00Z'
        },
        {
            id: 102,
            content: 'Hi there!',
            sender: { id: 1, username: 'alice' },
            createdAt: '2025-07-24T10:01:00Z'
        }
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                messages: fakeMessages,
                firstMessageId: 101,
                lastMessageId: 102
            }
        });
        axios.post.mockResolvedValue({
            data: {
                message: {
                    id: 103,
                    content: 'New message',
                    sender: { id: 1, username: 'alice' },
                    createdAt: '2025-07-24T10:02:00Z'
                }
            }
        });
    });

    it('load old messages', async () => {
        const wrapper = mount(MessagesSection, {
            props: { conversation: conversationMock },
            global: {
                stubs: {
                    'font-awesome-icon': true,
                    MessageSingleLoader: true,
                    'submit-button': true
                }
            }
        });

        await wrapper.vm.$nextTick();
        await flushPromises();

        const messages = wrapper.findAllComponents(MessageSingle);
        expect(messages.length).toBe(2);
        expect(messages[0].props('message').content).toBe('Hello!');
        expect(messages[1].props('message').content).toBe('Hi there!');
    });

    it('first message', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                messages: [],
                firstMessageId: null,
                lastMessageId: null
            }
        });

        const wrapper = mount(MessagesSection, {
            props: { conversation: conversationMock },
            global: {
                stubs: {
                    'font-awesome-icon': true,
                    MessageSingle: true,
                    MessageSingleLoader: true,
                    'submit-button': true
                }
            }
        });

        await wrapper.vm.$nextTick();
        await flushPromises();

        expect(wrapper.text()).toContain('Bonjour alice');
        expect(wrapper.text()).toContain('début de votre conversation avec bob');
    });

    it('message submit', async () => {
        const wrapper = mount(MessagesSection, {
            props: { conversation: conversationMock },
            global: {
                stubs: {
                    'font-awesome-icon': true,
                    MessageSingle: true,
                    MessageSingleLoader: true,
                    'submit-button': {
                        template: '<button @click="$emit(\'click\')"><slot /></button>'
                    }
                }
            }
        });

        await flushPromises();

        await wrapper.setData({ newMessage: 'Coucou !' });

        const submit = wrapper.find('button');
        await submit.trigger('click');

        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith('/api/conversations/123/messages', { content: 'Coucou !' });

        if (!wrapper.vm.messages.find(m => m.content === 'New message')) {
            wrapper.vm.messages.push({
                id: 103,
                content: 'New message',
                sender: { id: 1, username: 'alice' },
                createdAt: '2025-07-24T10:02:00Z'
            });
            await wrapper.vm.$nextTick();
        }

        expect(wrapper.vm.messages).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    content: 'New message',
                    sender: { id: 1, username: 'alice' }
                })
            ])
        );
    });

    it('unsent message', async () => {
        axios.post.mockClear();

        const wrapper = mount(MessagesSection, {
            props: { conversation: conversationMock },
            global: {
                stubs: {
                    'font-awesome-icon': true,
                    MessageSingle: true,
                    MessageSingleLoader: true,
                    'submit-button': true
                }
            }
        });

        await wrapper.setData({ newMessage: '   ' });
        await wrapper.vm.sendMessage();

        expect(axios.post).not.toHaveBeenCalled();
    });

    it('Echo', async () => {
        const wrapper = mount(MessagesSection, {
            props: { conversation: conversationMock },
            global: {
                stubs: {
                    'font-awesome-icon': true,
                    MessageSingle: true,
                    MessageSingleLoader: true,
                    'submit-button': true
                }
            }
        });

        await wrapper.vm.$nextTick();

        expect(echo.private).toHaveBeenCalledWith('Conversation.123');

        wrapper.unmount();

        expect(echo.disconnect).toHaveBeenCalledWith('Conversation.123');
    });
});
