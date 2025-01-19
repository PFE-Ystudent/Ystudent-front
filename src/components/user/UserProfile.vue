<template>
    <card class="w-full shadow px-2 pb-2 cursor-auto relative" :isSelected="isSelected"
        @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div class="flex pl-8" style="background: linear-gradient(to bottom, transparent 60%, white 40%);">
            <UserAvatar class="w-32 h-32" :avatar="user.avatar" :customClass="isSelected ? '!border-8 !border-sky-50' : '!border-8 !border-zinc-50'" />
            <div class="flex flex-col pl-4" style="width: calc(100% - 128px);">
                <div class="w-full h-3/5 flex justify-end items-center gap-4">
                    <slot></slot>
                </div>
                <div class="w-1/2 h-2/5 flex justify-between">
                    <div>
                        <div class="text-xl font-semibold">{{ user.username }}</div>
                        <div class="text-xs text-zinc-400">Membre</div>
                    </div>
                    <div class="h-full flex items-center">
                        <div class="flex gap-4 py-4 text-sky-400">
                            <div class="flex items-center font-semibold gap-2 hover:text-sky-500 cursor-pointer">
                                <div class="text-lg">{{ user.postsCount }}</div>
                                <font-awesome-icon icon="fa-solid fa-message" />
                            </div>
                            <div class="flex items-center font-semibold gap-2 hover:text-sky-500 cursor-pointer">
                                <div class="text-lg">{{ user.postRepliesCount }}</div>
                                <font-awesome-icon icon="fa-solid fa-reply" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-b-md p-2">
            <div>{{ user.about }}</div>
            <div class="text-end text-xs text-zinc-400">
                Actif depuis le {{ createdAt }}
            </div>
        </div>
        <TooltipAction v-if="actionType && actions.length" :actions="actions" :is-hover="isHover" class="absolute top-0 right-0 text-sky-400 cursor-pointer" @select-action="selectAction">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="p-4" />
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
    data() {
        return {
            isHover: false
        }
    },
    computed: {
        createdAt () {
            return new Date(this.user.createdAt).toLocaleString('fr', { hour12: false, dateStyle: "short" });
        },
        actions () {
            if (this.actionType) {
                return [{value: 'message', label: 'Messages'}];
            }
            return [];
        },
    },
    methods: {
        selectAction (action) {
            if (action === 'message') {
                axios.post('/api/conversations', { user_id: this.user.id }).then((res) => {
                    this.$router.push({ name: 'Conversation', params: { id: res.data.conversation.id } })
                })
            }
        }
    }
}
</script>

<style scoped>
    
</style>