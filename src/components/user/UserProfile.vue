<template>
    <card class="w-full shadow px-2 pb-2 text-color cursor-auto relative"
          :is-selected="isSelected"
          tabindex="0"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
          @focus="isFocus = true">
        <div class="split-bg flex pl-8">
            <UserAvatar class="w-24 h-24 md:w-32 md:h-32"
                        :avatar="user.avatar"
                        :custom-class="isSelected ? '!p-2 !bg-selected' : '!p-2 !bg-secondary'" />
            <div class="flex flex-col pl-4"
                 style="width: calc(100% - 128px);">
                <div class="w-full h-3/5 flex justify-end items-center gap-4">
                    <slot />
                </div>
                <div class="w-2/3 h-2/5 flex justify-between">
                    <div>
                        <div class="text-md md:text-xl font-semibold">
                            {{ user.username }}
                        </div>
                        <div class="text-xs text-zinc-400">
                            {{ user.role.name }}
                        </div>
                    </div>
                    <div class="hidden md:flex h-full items-center">
                        <div class="flex gap-4 py-4">
                            <badge color="#c27aff">
                                <font-awesome-icon icon="fa-solid fa-message" />
                                {{ user.postsCount }} Post{{ user.postsCount > 1 ? 's' : '' }}
                            </badge>
                            <badge color="#8e51ff">
                                <font-awesome-icon icon="fa-solid fa-reply" />
                                {{ user.postRepliesCount }} Réponse{{ user.postRepliesCount > 1 ? 's' : '' }}
                            </badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-body rounded-b-md p-2">
            <div class="flex md:hidden items-center justify-around py-1">
                <badge color="#c27aff">
                    <font-awesome-icon icon="fa-solid fa-message" />
                    {{ user.postsCount }} Post{{ user.postsCount > 1 ? 's' : '' }}
                </badge>
                <badge color="#8e51ff">
                    <font-awesome-icon icon="fa-solid fa-reply" />
                    {{ user.postRepliesCount }} Réponse{{ user.postRepliesCount > 1 ? 's' : '' }}
                </badge>
            </div>
            <div>{{ user.about }}</div>
            <div class="text-end text-xs text-zinc-400">
                Actif depuis le {{ createdAt }}
            </div>
        </div>
        <TooltipAction v-if="!noAction && actions.length"
                       :actions="actions"
                       :is-hover="isHover || isFocus"
                       class="absolute top-0 right-0 text-sky-400 cursor-pointer"
                       @select-action="selectAction"
                       @blur="isFocus = false">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"
                               class="p-4" />
        </TooltipAction>
    </card>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import axios from '@/axios';
import store from '@/store';

export default {
    name: 'UserProfile',
    components: {
        UserAvatar,
        TooltipAction
    },
    props: {
        user: {
            type: Object,
            required: true
        },
        isSelected: {
            type: Boolean,
            default: false
        },
        noAction: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            authUser: store.state.auth.user,
            isHover: false,
            isFocus: false
        };
    },
    computed: {
        createdAt () {
            return new Date(this.user.createdAt).toLocaleString('fr', { hour12: false, dateStyle: 'short' });
        },
        actions () {
            if (this.noAction) {
                return [];
            }
            const actions = [
                { value: 'show', label: 'Voir' },
            ];
            if (this.user.id === this.authUser.id) {
                actions.push({ value: 'edit', label: 'Modifier' });
            } else {
                if (!this.user.relationType) {
                    actions.push({ value: 'add', label: 'Ajouter' });
                }
                if (this.user.relationType !== 1) {
                    actions.push({ value: 'report', label: 'Signaler' });
                }
                actions.push({ value: 'message', label: 'Message' });
            }
            return actions;

        },
    },
    methods: {
        selectAction (action) {
            if (action === 'message') {
                axios.post('/api/conversations', { user_id: this.user.id }).then((res) => {
                    this.$router.push({ name: 'Conversation', params: { id: res.data.conversation.id } });
                });
            } else if (action === 'show') {
                this.$router.push({ name: 'UserDetails', params: { id: this.user.id } });
            } else if (action === 'edit') {
                this.$router.push({ name: 'Account' });
            } else if (action === 'add') {
                axios.post(`/api/users/${this.user.id}/relations/request`).then(() => {
                    // TODO: toast
                });
            }
        }
    }
};
</script>

<style scoped>
.split-bg {
    background: linear-gradient(to bottom, transparent 60%, var(--color-body) 40%);
}
</style>