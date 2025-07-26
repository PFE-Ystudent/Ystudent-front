import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '@/App.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App.vue', () => {
    let store;
    let router;

    beforeEach(() => {
        store = createStore({
            state () {
                return {
                    parameter: {
                        theme: 'light',
                    },
                };
            },
        });

        router = createRouter({
            history: createMemoryHistory(),
            routes: [],
        });
    });

    it('dark theme', async () => {
        store.state.parameter.theme = 'dark';

        const wrapper = shallowMount(App, {
            global: {
                plugins: [store, router],
                stubs: ['router-view'],
            },
        });

        await router.isReady();

        expect(wrapper.classes('dark')).toBe(true);
    });
});
