import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import DashboardView from '../views/auth/DashboardView.vue';
import PostView from '../views/PostView.vue';
import NetworkView from '../views/NetworkView.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/posts',
        name: 'Post',
        component: PostView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/networks',
        name: 'Network',
        component: NetworkView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
    },
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