<template>
    <div class="text-color">
        <div class="mt-8 border-sky-400 border-l-4 mb-4">
            <div class="text-3xl pl-2 border-sky-300 border-l-4">
                Bienvenue <span class="font-semibold text-sky-300">{{ user.username }}</span>
            </div>
        </div>
        <div class="mt-4 h-72" />
        <div class="mt-4 flex">
            <div class="w-1/4">
                <div>
                    <router-link class="hover:text-primary cursor-pointer underline"
                                 :to="{ name: 'CategoriesGestion' }">
                        Gestion des catégories
                    </router-link>
                </div>
            </div>
            <div class="w-1/4">
                <div>
                    <a class="hover:text-primary cursor-pointer underline">
                        Gestion des rôles
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: 'AdministrationView',
    data () {
        return {
            user: store.state.auth.user
        };
    }
};
</script>

<style></style>
