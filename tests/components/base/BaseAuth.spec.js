import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseAuth from '@/views/base/BaseAuth.vue';

vi.mock('@/store', () => ({
    default: {
        state: {
            auth: {
                user: {
                    username: 'testuser',
                    avatar: 'avatar.png'
                }
            }
        },
        commit: vi.fn()
    }
}));

vi.mock('@/axios', () => ({
    default: {
        delete: vi.fn(() => Promise.resolve())
    }
}));

describe('BaseAuth.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(BaseAuth, {
            global: {
                stubs: ['router-view'],
            }
        });
    });

    it('renders router-view', () => {
        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    });

    it('toggles sidebar on toggleSidebar method call', async () => {
        wrapper.vm.isSideBarVisible = false;
        await wrapper.vm.toggleSidebar();
        expect(wrapper.vm.isSideBarVisible).toBe(true);
    });

    it('closes sidebar on clickOutside if not desktop', async () => {
        wrapper.vm.isDesktop = false;
        wrapper.vm.isSideBarVisible = true;
        await wrapper.vm.clickOutside();
        expect(wrapper.vm.isSideBarVisible).toBe(false);
    });

    it('calls logout and redirects to login on logout', async () => {
        const push = vi.fn();
        wrapper.vm.$router = { push };

        const axios = await import('@/axios');
        await wrapper.vm.logout();

        expect(axios.default.delete).toHaveBeenCalledWith('/api/logout');
        expect(push).toHaveBeenCalledWith({ name: 'Login' });
    });
});
