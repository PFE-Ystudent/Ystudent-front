import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/auth/LoginView.vue';
import DashboardView from '../components/auth/DashboardView.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = store.state.auth.token;
    if (to.meta.middleware && to.meta.middleware.includes("auth") && !token) {
        return next({ name: 'Login'});
    }
    return next();
});

export default router;