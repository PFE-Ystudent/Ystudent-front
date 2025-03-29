<template>
    <card class="w-full shadow px-2 pb-2 text-color cursor-auto relative"
          :is-selected="isSelected"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false">
        <div class="split-bg flex pl-8">
            <UserAvatar class="w-32 h-32"
                        :avatar="user.avatar"
                        :custom-class="isSelected ? '!p-2 !bg-selected' : '!p-2 !bg-secondary'" />
            <div class="flex flex-col pl-4"
                 style="width: calc(100% - 128px);">
                <div class="w-full h-3/5 flex justify-end items-center gap-4">
                    <slot />
                </div>
                <div class="w-2/3 h-2/5 flex justify-between">
                    <div>
                        <div class="text-xl font-semibold">
                            {{ user.username }}
                        </div>
                        <div class="text-xs text-zinc-400">
                            {{ user.role.name }}
                        </div>
                    </div>
                    <div class="h-full flex items-center">
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
            <div>{{ user.about }}</div>
            <div class="text-end text-xs text-zinc-400">
                Actif depuis le {{ createdAt }}
            </div>
        </div>
        <TooltipAction v-if="actionType && actions.length"
                       :actions="actions"
                       :is-hover="isHover"
                       class="absolute top-0 right-0 text-sky-400 cursor-pointer"
                       @select-action="selectAction">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"
                               class="p-4" />
        </TooltipAction>
    </card>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import axios from '@/axios';

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
        actionType: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            isHover: false
        };
    },
    computed: {
        createdAt () {
            return new Date(this.user.createdAt).toLocaleString('fr', { hour12: false, dateStyle: 'short' });
        },
        actions () {
            if (this.actionType) {
                return [{ value: 'message', label: 'Messages' }];
            }
            return [];
        },
    },
    methods: {
        selectAction (action) {
            if (action === 'message') {
                axios.post('/api/conversations', { user_id: this.user.id }).then((res) => {
                    this.$router.push({ name: 'Conversation', params: { id: res.data.conversation.id } });
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