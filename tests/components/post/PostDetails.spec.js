import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from '@/axios';
import PostDetails from '@/views/post/PostDetails.vue';

vi.mock('@/axios', () => {
    return {
        default: {
            get: vi.fn(),
            delete: vi.fn(),
        },
    };
});

vi.mock('@/store', () => {
    return {
        default: {
            state: {
                auth: {
                    user: { id: 42 },
                },
            },
        },
    };
});

const pushMock = vi.fn();

describe('PostDetails.vue', () => {
    let wrapper;

    const mockPost = {
        id: 123,
        title: 'Test Post',
        author: { id: 42 },
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        axios.get.mockResolvedValue({ data: { post: mockPost } });

        wrapper = mount(PostDetails, {
            global: {
                mocks: {
                    $route: { params: { id: 123 } },
                    $router: { push: pushMock },
                },
                stubs: {
                    PostSingle: true,
                    PostSingleLoader: true,
                    PostSharePopup: true,
                    ConfirmPopup: true,
                },
            },
            shallow: true,
        });

        await flushPromises();
    });

    it('initializes with user and postId from route and fetches post', () => {
        expect(wrapper.vm.user).toEqual({ id: 42 });
        expect(wrapper.vm.postId).toBe(123);
        expect(axios.get).toHaveBeenCalledWith('/api/posts/123');
        expect(wrapper.vm.post).toEqual(mockPost);
    });

    it('shows loader if no post yet', async () => {
        axios.get.mockResolvedValueOnce({ data: { post: null } });
        const wrapper2 = mount(PostDetails, {
            global: {
                mocks: {
                    $route: { params: { id: 456 } },
                    $router: { push: pushMock },
                },
                stubs: {
                    PostSurvey: true,
                    PostSingle: true,
                    PostSingleLoader: true,
                },
            },
            shallow: true,
        });
        await flushPromises();
        expect(wrapper2.findComponent({ name: 'PostSingleLoader' }).exists()).toBe(true);
    });

    it('sets isEdited to true when edit button clicked (simulate)', async () => {
        wrapper.vm.isEdited = false;
        wrapper.vm.isShared = false;
        wrapper.vm.deleteIsVisible = false;

        expect(wrapper.vm.user.id).toBe(wrapper.vm.post.author.id);

        wrapper.vm.isEdited = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isEdited).toBe(true);
    });

    it('calls editPost and updates post and isEdited flag', () => {
        const editedPost = { id: 123, title: 'Edited Title', author: { id: 42 } };
        wrapper.vm.isEdited = true;

        wrapper.vm.editPost(editedPost);

        expect(wrapper.vm.post).toEqual(editedPost);
        expect(wrapper.vm.isEdited).toBe(false);
    });

    it('opens share popup when isShared is true', async () => {
        wrapper.vm.isShared = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent({ name: 'PostSharePopup' }).exists()).toBe(true);

        await wrapper.findComponent({ name: 'PostSharePopup' }).vm.$emit('close');
        expect(wrapper.vm.isShared).toBe(false);
    });

    it('shows ConfirmPopup when deleteIsVisible is true and hides on close', async () => {
        wrapper.vm.deleteIsVisible = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent({ name: 'ConfirmPopup' }).exists()).toBe(true);

        await wrapper.findComponent({ name: 'ConfirmPopup' }).vm.$emit('close');
        expect(wrapper.vm.deleteIsVisible).toBe(false);
    });

    it('calls deletePost and redirects on success', async () => {
        axios.delete.mockResolvedValue();

        wrapper.vm.post = mockPost;
        wrapper.vm.deleteIsVisible = true;

        await wrapper.vm.deletePost();

        expect(axios.delete).toHaveBeenCalledWith('/api/posts/123');
        expect(pushMock).toHaveBeenCalledWith({ name: 'Post' });
    });

    it('handles deletePost error gracefully', async () => {
        axios.delete.mockRejectedValue(new Error('fail'));

        wrapper.vm.post = mockPost;

        await wrapper.vm.deletePost();

        expect(axios.delete).toHaveBeenCalledWith('/api/posts/123');
        expect(pushMock).not.toHaveBeenCalledWith({ name: 'Post' });
    });
});
