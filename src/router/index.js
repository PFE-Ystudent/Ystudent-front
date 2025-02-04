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
import ConversationView from '@/views/conversation/ConversationView.vue';
import NotFound from '@/views/default/NotFound.vue';
import BaseUnAuth from '@/views/base/BaseUnAuth.vue';
import BaseAuth from '@/views/base/BaseAuth.vue';
import AdministrationView from '@/views/admin/AdministrationView.vue';
import CategoriesGestionView from '@/views/admin/gestion/CategoriesGestionView.vue';

const routes = [
    {
        path: '/',
        component: BaseAuth,
        meta: { middleware: ["auth"] },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: DashboardView
            },
            {
                path: 'account',
                name: 'Account',
                component: AccountView
            },
            {
                path: 'posts',
                name: 'Post',
                component: PostView
            },
            {
                path: 'posts/:id',
                name: 'PostDetails',
                component: PostDetails
            },
            {
                path: 'users/:id',
                name: 'UserDetails',
                component: UserDetails
            },
            {
                path: 'relations',
                name: 'Relation',
                component: RelationView
            },
            {
                path: 'conversations/:id?',
                name: 'Conversation',
                component: ConversationView
            }
        ]
    },
    {
        path: '/administration',
        component: BaseAuth,
        meta: { middleware: ["auth", "isAdmin"] },
        children: [
            {
                path: '',
                name: 'Administration',
                component: AdministrationView
            },
            {
                path: 'categories',
                name: 'CategoriesGestion',
                component: CategoriesGestionView
            },
        ]
    },
    {
        path: '/',
        component: BaseUnAuth,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: LoginView
            },
            {
                path: 'register',
                name: 'Register',
                component: RegisterView
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = store.state.auth.token;
    const isAdmin = store.getters.isAdmin;

    if (to.meta.middleware && to.meta.middleware.includes("auth") && !token) {
        return next({ name: 'Login', query: { redirect: to.path } });
    }
    if (to.meta.middleware && to.meta.middleware.includes("isAdmin") && !isAdmin) {
        return next({ name: 'NotFound' });
    }
    return next();
});

export default router;
