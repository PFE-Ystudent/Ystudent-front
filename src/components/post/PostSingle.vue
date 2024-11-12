<template>
    <card class="w-full relative px-4 pt-4"
         :class="isDetails ? 'pb-4' : 'pb-2'"
         @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div @click="showProfile = true" v-click-outside="() => {showProfile ? showProfile = false : null}" class="relative flex gap-2 items-center hover:bg-white hover:shadow-md cursor-pointer rounded-md max-w-min pl-1 pr-8">
            <UserAvatar class="w-8 h-8" :avatar="post.author.avatar" />
            <div>
                <div>{{ post.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
            <UserProfilePopup v-if="showProfile" :user-id="post.author.id" class="left-full ml-4" :class="{ 'top-0': isDetails }" />
        </div>
        <div class="text-xl font-semibold my-2">{{ post.title }}</div>
        <ExtendableContent class="mb-4" :content="post.content" />
        <div v-if="post.surveys.length" class="flex flex-col gap-4">
            <PostSurvey v-for="survey in post.surveys" :key="survey.id" :survey="survey" @update-survey="updateSurvey" />
        </div>
        <template v-if="!isDetails">
            <hr class="mx-20 mb-2 mt-4">
            <div class="flex justify-end">
                <div class="w-1/3 text-xs text-zinc-400 flex items-center">
                    {{ timestamp }}<div v-if="post.isEdited" class="font-semibold ml-1">• (modifié)</div>
                </div>
                <div class="w-1/3 flex justify-center">
                    <div class="text-sky-400 flex gap-2 items-center">
                        <div class="font-semibold mb-1">{{ post.replyCount ?? 0 }}</div>
                        <font-awesome-icon icon="fa-solid fa-reply" />
                    </div>
                </div>
                <div class="w-1/3 flex justify-end">
                    <cancel-button @click="$router.push({ name: 'PostDetails', params: { id: post.id } })">
                        <div class="flex gap-4 items-center">
                            <div class="mb-px">Voir</div>
                            <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
                        </div>
                    </cancel-button>
                </div>
            </div>
        </template>
        <div v-else class="text-xs text-zinc-400 pt-2 flex">
            {{ timestamp }}<div v-if="post.isEdited" class="font-semibold ml-1">• (modifié)</div>
        </div>
        <TooltipAction v-if="!isDetails" :actions="actions" :is-hover="isHover" class="absolute top-0 right-0 text-sky-400 cursor-pointer" @select-action="selectAction">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="p-4" />
        </TooltipAction>
    </card>
</template>

<script>
import store from '@/store';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import PostSurvey from '@/components/post/integrations/PostSurvey.vue';
import UserProfilePopup from '@/components/user/popup/UserProfilePopup.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';
import ExtendableContent from '../partials/ExtendableContent.vue';
import formatDate from '@/mixins/formatDate';


export default {
    name: "PostSingle",
    components: {
        TooltipAction,
        PostSurvey,
        UserProfilePopup,
        UserAvatar,
        ExtendableContent
    },
    mixins: [formatDate],
    props: {
        post: {
            type: Object,
            required: true
        },
        isDetails: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            user: store.state.auth.user,
            isHover: false,
            showProfile: false
        }
    },
    computed: {
        actions () {
            if (this.post.author.id === this.user.id) {
                return [
                    {value: 'edit', label: 'Modifier'},
                    {value: 'delete', label: 'Supprimer'},
                ]
            }
            return [{value: 'report', label: 'Signaler'}]
        },
        timestamp () {
            return this.formatTimestamp(this.post.createdAt)
        }
    }, 
    methods: {
        updateSurvey (survey) {
            this.$emit('update-survey', {
                postId: this.post.id,
                survey: survey
            });
        },
        selectAction (action) {
            if (action === 'delete') {
                this.$emit('delete-post', this.post.id)
            } else if (action === 'edit') {
                this.$emit('edit-post', this.post.id)
            }
        }
    }
}
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
