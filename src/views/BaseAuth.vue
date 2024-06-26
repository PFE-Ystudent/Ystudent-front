<template>
    <div>
        <div class="flex">
            <div class="relative min-h-screen" style="width: 72px;">
                <SideBar />
            </div>
            <div style="width: calc(100% - 72px);">
                <div class="h-16" style="width: calc(100% - 72px);">
                    <div class="h-16 px-4 bg-zinc-100 border-b-4 border-sky-300 fixed" style="z-index: 90; width: calc(100% - 72px);">
                        <div class="flex h-full justify-between">
                            <div></div>
                            <div class="flex items-center justify-center relative">
                                <div class="bg-sky-300/50 rounded-md cursor-pointer px-4 py-2 flex items-center gap-4 w-48" @click="(e) => {showUserDropdown = true; e.stopPropagation()}">
                                    <div class="w-8 h-8 bg-white rounded-full"></div>
                                    <div class="w-2/3 overflow-y-hidden truncate select-none">{{ username }}</div>
                                </div>
                                <div v-if="showUserDropdown" class="absolute top-full right-0" v-click-outside="() => {showUserDropdown ? showUserDropdown = false : null}">
                                    <div class="card w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-md">
                                        <button @click="logout">Déconnexion</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mx-4">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/sidebar/SideBar.vue';
import axios from '../axios';
import store from '../store';

export default {
    name: "BaseAuth",
    data () {
        return {
            username: null,
            showUserDropdown: false
        }
    },
    components: {
        SideBar
    },
    mounted () {
        this.username = store.state.auth.user.username
    },
    methods: {
        onClickOutside (event) {
        console.log('Clicked outside. Event: ', event)
      },
        logout () {
            axios.delete('/api/logout').then(() => {
                    store.commit('logout');
                    this.$router.push({ name: 'Login' });
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>