import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from '@/axios';
import PostView from '@/views/post/PostView.vue';

vi.mock('@/axios', () => {
    return {
        default: {
            get: vi.fn(),
            delete: vi.fn(),
        },
    };
});

describe('PostView.vue', () => {
    let wrapper;

    const mockCategories = [
        { id: 1, name: 'Cat 1' },
        { id: 2, name: 'Cat 2' }
    ];

    const mockPosts = [
        { id: 1, title: 'Post 1', author: { id: 1 }, surveys: [], files: [], isFavorited: false },
        { id: 2, title: 'Post 2', author: { id: 2 }, surveys: [], files: [], isFavorited: true }
    ];

    beforeEach(async () => {
        vi.clearAllMocks();

        axios.get.mockImplementation((url) => {
            if (url === '/api/categories') {
                return Promise.resolve({ data: { categories: mockCategories } });
            }
            if (url.startsWith('/api/posts/')) {
                return Promise.resolve({ data: { posts: mockPosts, lastPage: 5 } });
            }
        });

        wrapper = mount(PostView, {
            shallow: true,
        });

        await flushPromises();
    });

    it('fetches categories on mount and sets categories', () => {
        expect(axios.get).toHaveBeenCalledWith('/api/categories');
        expect(wrapper.vm.categories).toEqual(mockCategories);
    });

    it('initializes activeTab to first tab and fetches posts', () => {
        expect(wrapper.vm.activeTab).toBe('new');
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/api/posts/new'));
        expect(wrapper.vm.posts).toEqual(mockPosts);
        expect(wrapper.vm.lastPage).toBe(5);
        expect(wrapper.vm.isBusy).toBe(false);
    });

    it('sets a new tab and fetches posts accordingly', async () => {
        wrapper.vm.setTab('me');
        expect(wrapper.vm.activeTab).toBe('me');
        expect(wrapper.vm.isBusy).toBe(true);

        await flushPromises();

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/api/posts/me'));
        expect(wrapper.vm.posts).toEqual(mockPosts);
        expect(wrapper.vm.isBusy).toBe(false);
    });

    it('adds a post only if activeTab is "me"', async () => {
        wrapper.vm.activeTab = 'new';
        wrapper.vm.addPost({ id: 3 });
        expect(wrapper.vm.posts.find(p => p.id === 3)).toBeUndefined();

        wrapper.vm.activeTab = 'me';
        wrapper.vm.addPost({ id: 3 });
        expect(wrapper.vm.posts[0].id).toBe(3);
    });

    it('updates a post field correctly', () => {
        wrapper.vm.posts = [{ id: 1, title: 'Old Title' }];
        wrapper.vm.updatePost({ postId: 1, field: 'title', value: 'New Title' });
        expect(wrapper.vm.posts[0].title).toBe('New Title');
    });

    it('edits a post and clears postIdToEdit', () => {
        wrapper.vm.posts = [{ id: 1, title: 'Old Title' }];
        wrapper.vm.postIdToEdit = 1;

        const editedPost = { id: 1, title: 'Edited Title' };
        wrapper.vm.editPost(editedPost);

        expect(wrapper.vm.posts[0].title).toBe('Edited Title');
        expect(wrapper.vm.postIdToEdit).toBe(null);
    });

    it('deletes a post and removes it from the posts list', async () => {
        axios.delete.mockResolvedValue();
        wrapper.vm.posts = [{ id: 1 }, { id: 2 }];
        wrapper.vm.postIdToDelete = 1;

        await wrapper.vm.deletePost();

        expect(axios.delete).toHaveBeenCalledWith('/api/posts/1');
        expect(wrapper.vm.posts.find(p => p.id === 1)).toBeUndefined();
        expect(wrapper.vm.posts.length).toBe(1);
    });

    it('calls fetchPosts with formatted filter data on filter event', async () => {
        const fetchPostsSpy = vi.spyOn(wrapper.vm, 'fetchPosts');

        const filterData = { search: 'test', categories: [1, 2] };
        wrapper.vm.filter(filterData);

        expect(wrapper.vm.filterData).toEqual(filterData);
        expect(fetchPostsSpy).toHaveBeenCalled();
    });

    it('shows ConfirmPopup when postIdToDelete is set and clears it on close', async () => {
        wrapper.vm.postIdToDelete = 123;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent({ name: 'ConfirmPopup' }).exists()).toBe(true);

        await wrapper.findComponent({ name: 'ConfirmPopup' }).vm.$emit('close');
        expect(wrapper.vm.postIdToDelete).toBe(null);
    });

    it('shows PostSharePopup when postToShare is set and clears it on close', async () => {
        wrapper.vm.postToShare = { id: 1 };
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent({ name: 'PostSharePopup' }).exists()).toBe(true);

        await wrapper.findComponent({ name: 'PostSharePopup' }).vm.$emit('close');
        expect(wrapper.vm.postToShare).toBe(null);
    });
});
