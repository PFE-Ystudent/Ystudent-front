import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import SideBarItem from '@/components/sidebar/SideBarItem.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [
    { path: '/posts', name: 'Post', component: { template: '<div />' } }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

describe('SideBarItem.vue', () => {
    beforeEach(async () => {
        router.push('/');
        await router.isReady();
    });

    it('selected event', async () => {
        const wrapper = mount(SideBarItem, {
            global: {
                plugins: [router],
                stubs: ['font-awesome-icon']
            },
            props: {
                name: 'Posts',
                route: 'Post',
                icon: 'fa-message',
                isDeploy: true
            }
        });

        await wrapper.trigger('click');
        await flushPromises();

        expect(wrapper.emitted('selected')).toBeTruthy();
        expect(wrapper.emitted('selected')[0]).toEqual(['Posts']);
        expect(router.currentRoute.value.name).toBe('Post');
    });
});
