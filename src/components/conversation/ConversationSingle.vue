<template>
    <card class="w-full flex items-center p-2 gap-2 cursor-pointer text-color"
          tabindex="1"
          role="button"
          :aria-current="isSelected.toString()"
          :is-selected="isSelected"
          @keydown.enter="!isSelected ? $emit('click') : null">
        <UserAvatar class="w-8 h-8"
                    :avatar="conversation.avatar" />
        <div style="width: calc(100% - 40px);">
            <div class="font-semibold">
                {{ authUser.id === conversation.requester.id ? conversation.user.username : conversation.requester.username }}
            </div>
            <div v-if="conversation.lastMessage"
                 class="text-xs text-nowrap text-ellipsis overflow-hidden">
                {{ conversation.lastMessage.content }}
            </div>
        </div>
    </card>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';
import store from '@/store';

export default {
    name: 'ConversationSingle',
    components: {
        UserAvatar,
    },
    props: {
        conversation: {
            type: Object,
            required: true
        },
        isSelected: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            authUser: store.state.auth.user
        };
    },
};
</script>

<style scoped>

</style>