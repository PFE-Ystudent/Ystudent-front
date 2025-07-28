import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SideBar from '@/components/sidebar/SideBar.vue';
import SideBarItem from '@/components/sidebar/SideBarItem.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createStore } from 'vuex';

vi.mock('@/store', () => ({
    default: {
        getters: {
            isAdmin: true
        }
    },
    state: {
        parameter: {
            theme: 'dark'
        }
    },
}));

const fakeStore = createStore({
    state: {
        parameter: {
            theme: 'dark'
        }
    },
    default: {
        getters: {
            isAdmin: () => true
        }
    }
});

const routes = [
    { path: '/dashboard', name: 'Dashboard', component: { template: '<div />' } },
    { path: '/posts', name: 'Post', component: { template: '<div />' } },
    { path: '/relations', name: 'Relation', component: { template: '<div />' } },
    { path: '/conversations', name: 'Conversation', component: { template: '<div />' } },
    { path: '/admin', name: 'Administration', component: { template: '<div />' } }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

describe('SideBar.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = mount(SideBar, {
            global: {
                plugins: [router, fakeStore],
                stubs: ['font-awesome-icon']
            }
        });
        await router.isReady();
    });

    it('show all section', () => {
        const items = wrapper.findAllComponents(SideBarItem);
        expect(items.length).toBe(4);
        const names = items.map(i => i.props('name'));
        expect(names).toContain('Administration');
    });

    it('send selected event', async () => {
        const item = wrapper.findAllComponents(SideBarItem)[0];
        await item.vm.$emit('selected', 'Posts');
        expect(wrapper.emitted('selected')).toBeTruthy();
        expect(wrapper.emitted('selected')[0]).toEqual(['Posts']);
    });

    it('redirect to Dashboard', async () => {
        const divLogo = wrapper.find('a.cursor-pointer');
        await divLogo.trigger('click');
        await flushPromises();
        expect(wrapper.vm.$router.currentRoute.value.name).toBe('Post');
    });
});
