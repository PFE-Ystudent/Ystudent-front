import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import TabNav from '@/components/partials/TabNav.vue';

describe('TabNav.vue', () => {
    const tabs = [
        { name: 'Tab 1', value: 'tab1', icon: 'fa-home' },
        { name: 'Tab 2', value: 'tab2', icon: 'fa-user' },
        { name: 'Tab 3', value: 'tab3' }
    ];

    let wrapper;

    beforeEach(async () => {
        wrapper = mount(TabNav, {
            props: {
                tabs,
                defaultTab: 'tab1'
            },
            global: {
                stubs: ['font-awesome-icon']
            },
            attachTo: document.body
        });

        await flushPromises();

        for (const tab of tabs) {
            const refEl = wrapper.vm.$refs[`tab-container-${tab.value}`][0];
            Object.defineProperty(refEl, 'clientWidth', {
                value: 123,
                configurable: true
            });

            Object.defineProperty(refEl, 'getBoundingClientRect', {
                value: () => ({ width: 123 }),
                configurable: true
            });
        }

        wrapper.vm.tabWidth = wrapper.vm.$refs[`tab-container-${wrapper.vm.selectedTab}`][0].clientWidth;
    });

    it('update selectedTab and tabWidth', async () => {
        const tab3 = wrapper.findAll('.cursor-pointer > button')[2];
        await tab3.trigger('click');

        const updatedWidth = wrapper.vm.tabWidth;

        expect(wrapper.vm.selectedTab).toBe('tab3');
        expect(updatedWidth).not.toBe(0);
        expect(updatedWidth).toBe(123);
    });
});
