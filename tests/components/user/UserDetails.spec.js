import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import axios from '@/axios';
import UserDetails from '@/views/user/UserDetails.vue';

vi.mock('@/axios', () => ({
    default: {
        get: vi.fn(),
        delete: vi.fn()
    }
}));

const mockRoute = {
    params: {
        id: '123'
    }
};

vi.mock('@/components/user/UserProfile.vue', () => ({
    default: {
        name: 'UserProfile',
        template: '<div class="UserProfile">User Profile</div>',
        props: ['user', 'isSelected']
    }
}));

vi.mock('@/components/post/PostSingle.vue', () => ({
    default: {
        name: 'PostSingle',
        template: '<div class="PostSingle">Post Single</div>',
        props: ['post']
    }
}));

describe('UserDetails.vue', () => {
    let wrapper;

    beforeEach(() => {
        axios.get.mockReset();
        axios.delete.mockReset();

        axios.get.mockImplementation((url) => {
            if (url === '/api/users/123') {
                return Promise.resolve({ data: { username: 'testuser' } });
            }
            if (url === '/api/users/123/posts?page=1') {
                return Promise.resolve({ data: { posts: [{ id: 1, title: 'Test post' }], lastPage: 2 } });
            }
            return Promise.reject(new Error('Not found'));
        });

        wrapper = shallowMount(UserDetails, {
            global: {
                mocks: {
                    $route: mockRoute
                },
                stubs: ['submit-button', 'cancel-button', 'font-awesome-icon']
            }
        });
    });

    it('fetches user and posts on mount', () => {
        expect(axios.get).toHaveBeenCalledWith('/api/users/123');
        expect(axios.get).toHaveBeenCalledWith('/api/users/123/posts?page=1');
    });

    it('renders user profile if user is defined', async () => {
        await nextTick();
        expect(wrapper.findComponent({ name: 'UserProfile' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'UserProfileLoader' }).exists()).toBe(false);
    });

    it('renders loader if user is not defined', async () => {
        wrapper.vm.user = null;
        await nextTick();
        expect(wrapper.findComponent({ name: 'UserProfileLoader' }).exists()).toBe(true);
    });

    it('renders posts when not busy', async () => {
        wrapper.vm.isBusy = false;
        wrapper.vm.posts = [{ id: 1, title: 'Test post' }];
        await nextTick();
        expect(wrapper.findComponent({ name: 'PostSingle' }).exists()).toBe(true);
    });

    it('renders post loaders when busy', async () => {
        wrapper.vm.isBusy = true;
        await nextTick();
        expect(wrapper.findAllComponents({ name: 'PostSingleLoader' }).length).toBe(3);
    });
});
