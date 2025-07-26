import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from '@/axios';
import MessageSingle from '@/components/conversation/MessageSingle.vue';

vi.mock('@/axios', () => ({
    default: {
        put: vi.fn(),
        delete: vi.fn()
    }
}));

const fakeMessage = {
    id: 1,
    content: 'Hello world',
    createdAt: '2025-07-24T12:00:00Z',
    sender: { avatar: 'avatar.jpg' },
    post: null,
    files: [],
    isUpdated: false
};

describe('MessageSingle.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(MessageSingle, {
            props: {
                message: { ...fakeMessage },
                withAvatar: true,
                isCurrentUser: true
            },
            global: {
                stubs: ['font-awesome-icon', 'router-link']
            }
        });
    });

    it('render message content', () => {
        expect(wrapper.text()).toContain(fakeMessage.content);
    });

    it('toggle edit mode', async () => {
        await wrapper.setData({ isHover: true });
        const editBtn = wrapper.findAll('.hover\\:bg-primary').at(0);
        await editBtn?.trigger('click');

        expect(wrapper.vm.isEditable).toBe(true);
    });

    // TODO: test saveEdit method

    it('delete message', async () => {
        axios.delete.mockResolvedValue({});

        await wrapper.vm.deleteMessageAction();

        expect(axios.delete).toHaveBeenCalledWith('/api/messages/1');
        expect(wrapper.emitted('delete')).toBeTruthy();
    });

    it('cancel with keyboard', async () => {
        wrapper.vm.isEditable = true;

        wrapper.vm.$refs.messageContent = {
            innerText: 'Changed',
            textContent: 'Changed'
        };

        await wrapper.setProps({
            message: { ...fakeMessage, content: 'Hello world' }
        });

        const event = { keyCode: 27, preventDefault: vi.fn() };
        await wrapper.vm.editMessageAction(event);

        expect(wrapper.vm.isEditable).toBe(false);
        expect(wrapper.vm.$refs.messageContent.innerText).toBe('Hello world');
    });
});
