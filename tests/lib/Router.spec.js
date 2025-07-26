import { describe, it, expect, beforeEach, vi } from 'vitest';
import router from '@/router';
import store from '@/store';

vi.mock('@/store', () => {
    return {
        default: {
            state: { auth: { token: null } },
            getters: { isAdmin: false }
        }
    };
});

describe('Router middleware tests', () => {
    beforeEach(() => {
        store.state.auth.token = null;
        store.getters.isAdmin = false;
    });

    it('redirect non authentificated user to Login', async () => {
        await router.push({ name: 'Post' });
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('Login');
        expect(router.currentRoute.value.query.redirect).toBe('/posts');
    });

    it('redirect authentificated user', async () => {
        store.state.auth.token = 'valid-token';

        await router.push({ name: 'Dashboard' });
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('Dashboard');
    });

    it('redirect non admin to NotFound', async () => {
        store.state.auth.token = 'valid-token';
        store.getters.isAdmin = false;

        await router.push({ name: 'Administration' });
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('NotFound');
    });

    it('admin access', async () => {
        store.state.auth.token = 'valid-token';
        store.getters.isAdmin = true;

        await router.push({ name: 'Administration' });
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('Administration');
    });
});
