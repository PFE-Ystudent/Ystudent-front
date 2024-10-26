<template>
    <div class="w-full relative rounded-md border border-zinc-300 bg-zinc-50 px-4 pt-4 pb-2" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div class="flex gap-2 items-center">
            <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
            <div>
                <div>{{ post.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
        <div class="text-xl font-semibold my-2">{{ post.title }}</div>
        <div class="whitespace-pre-line">{{ post.content }}</div>
        <div v-if="post.surveys.length">
            <PostSurvey v-for="survey in post.surveys" :key="survey.id" :survey="survey" @update-survey="updateSurvey" />
        </div>
        <hr class="mx-20 mb-2 mt-4">
        <div class="flex justify-end">
            <div class="w-3/5 flex justify-center">
                <div class="text-sky-400 flex gap-2 items-center">
                    <div class="font-semibold mb-1">{{ post.replyCount ?? 0 }}</div>
                    <font-awesome-icon icon="fa-solid fa-reply" />
                </div>
            </div>
            <div class="w-1/5 flex justify-end">
                <CancelButton @click="$router.push({ name: 'PostDetails', params: { id: post.id } })">
                    <div class="flex gap-4 items-center">
                        <div class="mb-px">Voir</div>
                        <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
                    </div>
                </CancelButton>
            </div>
        </div>
        <TooltipAction :actions="actions" :is-hover="isHover" class="absolute top-0 right-0 text-sky-400 cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="p-4" />
        </TooltipAction>
    </div>
</template>

<script>
import CancelButton from './CancelButton.vue';
import store from '@/store';
import TooltipAction from './TooltipAction.vue';
import PostSurvey from './PostSurvey.vue';


export default {
    name: "PostSingle",
    components: {
        CancelButton,
        TooltipAction,
        PostSurvey
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            user: store.state.auth.user,
            isHover: false
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
        }
    }, 
    methods: {
        updateSurvey (survey) {
            this.$emit('update-survey', {
                postId: this.post.id,
                survey: survey
            });
        }
    }
}
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
