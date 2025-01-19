<template>
    <card class="w-full p-4 relative"
          @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div @click="showProfile = true" v-click-outside="() => {showProfile ? showProfile = false : null}" class="relative flex gap-2 items-center hover:bg-white hover:shadow-md cursor-pointer rounded-md max-w-min pl-1 pr-8">
            <UserAvatar class="w-8 h-8" :avatar="postReply.author.avatar" />
            <div>
                <div>{{ postReply.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
            <UserProfilePopup v-if="showProfile" :user-id="postReply.author.id" class="left-full ml-4" />
        </div>
        <div class="flex">
            <ExtendableContent class="mt-2 w-full" :content="postReply.content" />
            <div class="py-4 px-8 text-center" :class="postReply.isUpVoted ? 'text-sky-400' : 'text-zinc-400'">
                <font-awesome-icon icon="fa-solid fa-arrow-up" class="cursor-pointer upvote" :fade="upVoteBusy" size="2xl" @click="upVote" />
                <div class="font-semibold select-none">+{{ postReply.upCount }}</div>
            </div>
        </div>
        <div class="text-xs text-zinc-400 pt-2 flex">
            {{ timestamp }}<div v-if="postReply.isEdited" class="font-semibold ml-1">• (modifié)</div>
        </div>
        <TooltipAction v-if="!isDetails" :actions="actions" :is-hover="isHover" class="absolute top-0 right-0 text-sky-400 cursor-pointer" @select-action="selectAction">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="p-4" />
        </TooltipAction>
    </card>
</template>

<script>
import store from '@/store';
import UserAvatar from '@/components/user/UserAvatar.vue';
import formatDate from '@/mixins/formatDate';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import ExtendableContent from '@/components/partials/ExtendableContent.vue';
import axios from '@/axios';
import UserProfilePopup from '@/components/user/popup/UserProfilePopup.vue';


export default {
    name: "PostReplySingle",
    components: {
        UserAvatar,
        TooltipAction,
        ExtendableContent,
        UserProfilePopup
    },
    mixins: [formatDate],
    props: {
        postReply: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: store.state.auth.user,
            isHover: false,
            upVoteBusy: false,
            showProfile: false
        }
    },
    computed: {
        actions () {
            if (this.postReply.author.id === this.user.id) {
                return [
                    {value: 'edit', label: 'Modifier'},
                    {value: 'delete', label: 'Supprimer'},
                ]
            }
            return [{value: 'report', label: 'Signaler'}]
        },
        timestamp () {
            return this.formatTimestamp(this.postReply.createdAt)
        }
    },
    methods: {
        upVote () {
            this.upVoteBusy = true
            axios.post(`/api/posts/replies/${this.postReply.id}/up`).then(res => {
                    this.$emit('update', res.data);
                }).catch(() => {
                    // TODO: gérer l'erreur
                }).finally(() => {
                    this.upVoteBusy = false
                })
        },
        selectAction (action) {
            if (action === 'edit') {
                this.$emit('editPostReply', this.postReply.id)
            } else if (action === 'delete') {
                this.$emit('deletePostReply', this.postReply.id)
            }
        }
    }
}
</script>

<style scoped>

</style>