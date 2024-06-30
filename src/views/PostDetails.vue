<template>
    <BaseAuth>
        <div class="flex mt-8">
            <div class="w-1/5 flex justify-end px-8">
                <div>
                    <button class="flex gap-4 items-center text-zinc-400 cursor-pointer" @click="$router.push({ name: 'Post' })">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                        <div class="mb-[3px]">Retour</div>
                    </button>
                </div>
            </div>
            <div class="w-3/5">
                <div v-if="post" class="w-full rounded-md border border-zinc-300 bg-zinc-50 p-4">
                    <div class="flex gap-2 items-center">
                        <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
                        <div>
                            <div>{{ post.author.username }}</div>
                            <div class="text-xs text-zinc-400">Membre</div>
                        </div>
                    </div>
                    <div class="text-xl font-semibold my-2">{{ post.title }}</div>
                    <div>{{ post.content }}</div>
                </div>
                <PostSingleLoader v-else />
                <div class="mt-4 px-4">
                    <PostReplyForm :post-id="postId" @new-reply="addReply" />
                </div>
                <div class="mt-4 mb-32 px-4 flex flex-col gap-4">
                    <PostReplySingle v-for="postReply in postReplies" :key="postReply.id" :post-reply="postReply" />
                </div>
            </div>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from './BaseAuth.vue';
import axios from '../axios'
import PostSingleLoader from '@/components/PostSingleLoader.vue';
import PostReplyForm from '@/components/PostReplyForm.vue';
import PostReplySingle from '@/components/PostReplySingle.vue';

export default {
    name: 'PostDetails',
    components: {
        BaseAuth,
        PostSingleLoader,
        PostReplyForm,
        PostReplySingle
    },
    data () {
        return {
            postId: null,
            post: null,
            isBusy: false,
            postReplies: []
        }
    },
    mounted () {
        this.postId = this.$route.params.id
        this.fetchPost();
        this.fetchPostReplies();
    },
    methods: {
        fetchPost () {
            axios.get(`/api/posts/${this.postId}`).then(res => {
                    this.post = res.data.post;
                }).catch(() => {
                    // TODO: rediriger sur une 404
                })
        },
        fetchPostReplies () {
            this.isBusy = true;
            axios.get(`/api/posts/${this.postId}/replies`).then(res => {
                    this.postReplies = res.data.postReplies;
                    console.log(this.postReplies);
                }).catch(() => {
                    // TODO: rediriger sur une 404
                }).finally(() => {
                    this.isBusy = false
                })
        },
        addReply (newReply) {
            this.postReplies.push(newReply)
        }
    }
}
</script>

<style>

</style>
