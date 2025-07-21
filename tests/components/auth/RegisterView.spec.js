import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import RegisterView from '@/views/auth/RegisterView.vue';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';
import TextInput from '@/components/partials/input/TextInput.vue';

// Mock axios post
vi.mock('@/axios', () => ({
    default: {
        post: vi.fn()
    }
}));

// Mock store
vi.mock('@/store', () => ({
    default: {
        state: {
            auth: {
                token: null
            }
        },
        commit: vi.fn()
    }
}));

const routes = [
    { path: '/', name: 'Dashboard' },
    { path: '/register', name: 'Register' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

describe('RegisterView.vue', () => {
    it('should register successfully and redirect to dashboard', async () => {
        axios.post.mockResolvedValue({
            data: {
                token: 'new-token',
                user: { id: 2, name: 'New User' }
            }
        });

        await router.push('/register');
        await router.isReady();

        const wrapper = mount(RegisterView, {
            global: {
                plugins: [router]
            }
        });

        const inputs = wrapper.findComponent(CardForm).findAllComponents(TextInput);

        const usernameInput = inputs.find(i => i.props('label').includes('Nom d\'utilisateur'));
        const emailInput = inputs.find(i => i.props('type') === 'email');
        const passwordInput = inputs.find(i => i.props('label').includes('Mot de passe :') && i.props('type') === 'password');
        const confirmationInput = inputs.find(i => i.props('label').includes('Confirmer'));

        await usernameInput.vm.$emit('update:modelValue', 'newuser');
        await emailInput.vm.$emit('update:modelValue', 'new@example.com');
        await passwordInput.vm.$emit('update:modelValue', 'pass1234');
        await confirmationInput.vm.$emit('update:modelValue', 'pass1234');

        await wrapper.vm.register();
        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith('/api/register', {
            username: 'newuser',
            email: 'new@example.com',
            password: 'pass1234',
            password_confirmation: 'pass1234'
        });

        expect(store.commit).toHaveBeenCalledWith('login', 'new-token');
        expect(store.commit).toHaveBeenCalledWith('setUser', { id: 2, name: 'New User' });
        expect(router.currentRoute.value.name).toBe('Dashboard');
    });

    it('should set errors when register fails', async () => {
        axios.post.mockRejectedValue({
            response: {
                data: {
                    errors: {
                        username: ['Nom invalide'],
                        email: ['Email invalide']
                    }
                }
            }
        });

        await router.push('/register');
        await router.isReady();

        const wrapper = mount(RegisterView, {
            global: {
                plugins: [router]
            }
        });

        wrapper.vm.username = 'baduser';
        wrapper.vm.email = 'bad@example.com';
        wrapper.vm.password = 'badpass';
        wrapper.vm.password_confirmation = 'badpass';

        await wrapper.vm.register();
        await flushPromises();

        expect(wrapper.vm.errors).toEqual({
            username: ['Nom invalide'],
            email: ['Email invalide']
        });
        expect(wrapper.vm.isBusy).toBe(false);
    });

    it('should redirect immediately if token is already present', async () => {
        store.state.auth.token = 'existing-token';

        await router.push('/register');
        await router.isReady();

        mount(RegisterView, {
            global: {
                plugins: [router]
            }
        });

        await flushPromises();
        expect(router.currentRoute.value.name).toBe('Dashboard');
    });
});
