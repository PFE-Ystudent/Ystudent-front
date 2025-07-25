import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseUnAuth from '@/views/base/BaseUnAuth.vue';

describe('BaseUnAuth.vue', () => {
    it('layout render', () => {
        const wrapper = shallowMount(BaseUnAuth, {
            global: {
                stubs: ['router-view'],
            },
        });

        const headerText = wrapper.find('.text-3xl').text();
        expect(headerText).toBe('YStudent');

        const images = wrapper.findAll('img');
        expect(images.length).toBe(2);

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    });
});
