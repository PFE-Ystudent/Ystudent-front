import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import PostView from '@/views/post/PostView.vue';
import RelationView from '@/views/relation/RelationView.vue';
import store from '@/store';
import PostDetails from '@/views/post/PostDetails.vue';
import AccountView from '@/views/user/AccountView.vue';
import UserDetails from '@/views/user/UserDetails.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/posts',
        name: 'Post',
        component: PostView,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/posts/:id',
        name: 'PostDetails',
        component: PostDetails,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: UserDetails,
        meta: {middleware: ["auth"]}
    },
    {
        path: '/relations',
        name: 'Relation',
        component: RelationView,
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