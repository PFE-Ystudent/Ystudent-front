import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ConversationsSection from '@/components/conversation/ConversationsSection.vue';

const conversationsMock = [
    {
        id: 1,
        requester: { id: 1, username: 'Alice' },
        user: { id: 2, username: 'Bob' },
    },
    {
        id: 2,
        requester: { id: 3, username: 'Charlie' },
        user: { id: 1, username: 'Alice' },
    },
];

describe('ConversationsSection.vue', () => {
    let wrapper;
    let mockRouter;

    beforeEach(() => {
        mockRouter = {
            push: vi.fn(),
        };

        wrapper = mount(ConversationsSection, {
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: { params: {} },
                },
                stubs: ['text-input', 'ConversationSingle', 'ConversationSingleLoader'],
            },
        });
    });

    it('fetches conversations and filters correctly', async () => {
        await wrapper.setData({ conversations: conversationsMock, search: 'Charlie' });
        await wrapper.vm.filtered();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.filteredConversations).toHaveLength(1);
        expect(wrapper.vm.filteredConversations[0].id).toBe(2);
    });

    it('selectConversation emits events and updates route', async () => {
        await wrapper.setData({ conversations: conversationsMock });

        const conversation = conversationsMock[0];

        wrapper.vm.selectConversation(conversation);

        expect(wrapper.emitted('select-conversation')).toBeTruthy();
        expect(wrapper.vm.selectedConversation).toStrictEqual(conversation);
        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'Conversation',
            params: { id: conversation.id },
        });
    });
});
