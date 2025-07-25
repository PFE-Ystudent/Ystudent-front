import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import axios from '@/axios';
import RelationView from '@/views/relation/RelationView.vue';

vi.mock('@/axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn()
    }
}));

describe('RelationView.vue', () => {
    let wrapper;

    beforeEach(() => {
        axios.get.mockReset();
        axios.post.mockReset();

        axios.get.mockResolvedValue({
            data: [
                { id: 1, name: 'User One' },
                { id: 2, name: 'User Two' },
            ]
        });

        wrapper = shallowMount(RelationView, {
            global: {
                mocks: {
                    window: { innerWidth: 1024 }
                }
            }
        });
    });

    it('load relation', () => {
        expect(axios.get).toHaveBeenCalledWith('/api/users/relations/contact');
    });

    it('show UserProfile when is not busy', async () => {
        wrapper.vm.isBusy = false;
        wrapper.vm.activeTab = 'contact';
        wrapper.vm.users = [{ id: 1, name: 'User One' }];
        await wrapper.vm.$nextTick();

        expect(wrapper.findAllComponents({ name: 'UserProfile' }).length).toBe(1);
        expect(wrapper.findComponent({ name: 'UserProfileLoader' }).exists()).toBe(false);
        expect(wrapper.findComponent({ name: 'UserSearch' }).exists()).toBe(false);
    });

    it('show loaders', async () => {
        wrapper.vm.isBusy = true;
        wrapper.vm.activeTab = 'contact';
        await wrapper.vm.$nextTick();

        expect(wrapper.findAllComponents({ name: 'UserProfileLoader' }).length).toBe(3);
    });

    it('select UserSearch', async () => {
        wrapper.vm.activeTab = 'search';
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent({ name: 'UserSearch' }).exists()).toBe(true);
        expect(wrapper.findAllComponents({ name: 'UserProfile' }).length).toBe(0);
    });

    it('switch tabs', async () => {
        axios.get.mockClear();
        wrapper.vm.setTab('blocked');
        expect(wrapper.vm.activeTab).toBe('blocked');
        expect(wrapper.vm.users).toEqual([]);
        expect(axios.get).toHaveBeenCalledWith('/api/users/relations/blocked');

        axios.get.mockClear();
        wrapper.vm.setTab('search');
        expect(wrapper.vm.activeTab).toBe('search');
        expect(wrapper.vm.users).toEqual([]);
        expect(axios.get).not.toHaveBeenCalled();
    });

    it('relation request reply', async () => {
        wrapper.vm.users = [
            { id: 1, name: 'User One' },
            { id: 2, name: 'User Two' }
        ];

        axios.post.mockResolvedValue({});

        await wrapper.vm.replyRequest(1, true);

        expect(axios.post).toHaveBeenCalledWith('/api/users/1/relations/request/reply', { is_accepted: true });
        expect(wrapper.vm.users.find(u => u.id === 1)).toBeUndefined();
        expect(wrapper.vm.users.find(u => u.id === 2)).toBeDefined();
    });
});
