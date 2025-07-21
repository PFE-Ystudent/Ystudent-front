import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginView from '@/views/auth/LoginView.vue';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import axios from '@/axios';
import { nextTick } from 'vue';
import CardForm from '@/components/container/CardForm.vue';
import TextInput from '@/components/partials/input/TextInput.vue';

// Mock axios post
vi.mock('@/axios', () => {
    return {
        default: {
            post: vi.fn()
        }
    };
});

// Mock store.commit
vi.mock('@/store', () => {
    return {
        default: {
            state: {
                auth: {
                    token: null
                }
            },
            commit: vi.fn()
        }
    };
});

const routes = [{ path: '/', name: 'Dashboard' }, { path: '/login', name: 'Login' }];
const router = createRouter({
    history: createWebHistory(),
    routes
});

describe('LoginView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should login successfully and redirect to dashboard', async () => {
        axios.post.mockResolvedValue({
            data: {
                token: 'fake-token',
                user: { id: 1, name: 'Test User' }
            }
        });

        const wrapper = mount(LoginView, {
            global: {
                plugins: [router]
            },
        });

        const inputs = wrapper.findComponent(CardForm).findAllComponents(TextInput);
        const emailInput = inputs.find(inputWrapper => inputWrapper.props('type') === 'email');

        await emailInput.vm.$emit('update:modelValue', 'test@example.com');
        wrapper.vm.password = 'password123';

        await wrapper.vm.login();
        await nextTick();

        expect(axios.post).toHaveBeenCalledWith('/api/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        expect(store.commit).toHaveBeenCalledWith('login', 'fake-token');
        expect(store.commit).toHaveBeenCalledWith('setUser', { id: 1, name: 'Test User' });

        await router.isReady();
        await nextTick();
        expect(wrapper.vm.isBusy).toBe(false);

        expect(router.currentRoute.value.name).toBe('Dashboard');
    });

    it('should set errors when login fails', async () => {
        // Mock axios.post to reject with errors
        axios.post.mockRejectedValue({
            response: {
                data: {
                    errors: {
                        email: ['Email invalide'],
                        password: ['Mot de passe incorrect']
                    }
                }
            }
        });

        const wrapper = mount(LoginView, {
            global: {
                plugins: [router]
            }
        });

        wrapper.vm.email = 'bad@example.com';
        wrapper.vm.password = 'badpassword';

        await wrapper.vm.login();
        await nextTick();

        expect(wrapper.vm.errors).toEqual({
            email: ['Email invalide'],
            password: ['Mot de passe incorrect']
        });

        await nextTick();
        expect(wrapper.vm.isBusy).toBe(false);
    });

    it('should redirect to dashboard immediately if token is already present', async () => {
        store.state.auth.token = 'fake-token';

        await router.push('/login');
        await router.isReady();

        mount(LoginView, {
            global: {
                plugins: [router]
            }
        });

        await flushPromises();
        expect(router.currentRoute.value.name).toBe('Dashboard');
    });
});
