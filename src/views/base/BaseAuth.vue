<template>
    <div>
        <div class="flex">
            <div class="relative min-h-screen"
                 style="width: 72px;">
                <SideBar />
            </div>
            <div style="width: calc(100% - 72px);">
                <div class="h-16"
                     style="width: calc(100% - 72px);">
                    <div class="h-16 px-4 bg-primary border-b-2 border-primary fixed"
                         style="z-index: 90; width: calc(100% - 72px);">
                        <div class="flex h-full justify-between">
                            <div />
                            <div class="flex items-center justify-center relative">
                                <TooltipAction :actions="[{ value: 'account', label: 'Mon compte'}, {value: 'logout', label: 'Déconnexion'}]"
                                               @select-action="selectAction">
                                    <card class="cursor-pointer px-4 py-2 flex items-center gap-4 w-48">
                                        <UserAvatar class="w-8 h-8"
                                                    :avatar="user.avatar" />
                                        <div class="w-2/3 overflow-y-hidden truncate select-none text-color">
                                            {{ user.username }}
                                        </div>
                                    </card>
                                </TooltipAction>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mx-4">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/sidebar/SideBar.vue';
import axios from '@/axios';
import store from '@/store';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';

export default {
    name: 'BaseAuth',
    components: {
        TooltipAction,
        SideBar,
        UserAvatar
    },
    data () {
        return {
            user: store.state.auth.user,
            showUserDropdown: false
        };
    },
    methods: {
        selectAction (action) {
            if (action === 'logout') {
                this.logout();
            } else if (action === 'account') {
                this.$router.push({ name: 'Account' });
            }
        },
        logout () {
            axios.delete('/api/logout').then(() => {
                    store.commit('logout');
                    this.$router.push({ name: 'Login' });
                })
                .catch(err => console.log(err));
        }
    }
};
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>