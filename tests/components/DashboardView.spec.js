import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DashboardView from '@/views/DashboardView.vue';

vi.mock('@/store', () => ({
    default: {
        state: {
            auth: {
                user: {
                    username: 'TestUser'
                }
            }
        }
    }
}));

describe('DashboardView.vue', () => {
    it('show dashboard', () => {
        const wrapper = mount(DashboardView);

        expect(wrapper.text()).toContain('TestUser');
        expect(wrapper.text()).toContain('Les activités récentes qui pourraient vous intéresser');
    });
});
