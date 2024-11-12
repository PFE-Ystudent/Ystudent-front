<template>
    <BaseAuth>
        <div class="flex mt-8">
            <div class="w-1/5 flex justify-end px-8">
                <div>
                    <button class="flex gap-4 items-center text-zinc-400 hover:text-black cursor-pointer" @click="$router.push({ name: 'Post' })">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                        <div class="mb-[3px]">Retour</div>
                    </button>
                </div>
            </div>
            <div class="w-3/5">
                <template v-if="post">
                    <PostSingle v-if="!isEdited" :post="post" isDetails />
                    <PostEditForm v-else :post="post" @cancel="isEdited = false" @confirm="editPost" />
                </template>
                <PostSingleLoader v-else />
                <div v-if="postId" class="px-4 mb-32">
                    <PostReplies :postId="postId" />
                </div>
            </div>
            <div v-if="post" class="w-1/5 pl-4">
                <template v-if="user.id === post.author.id">
                    <submit-button @click="isEdited = true">
                        Modifier
                    </submit-button>
                    <submit-button class="mt-4" @click="deleteIsVisible = true">
                        Supprimer
                    </submit-button>
                </template>
                <cancel-button v-else>
                    Signaler
                </cancel-button>
            </div>
            <ConfirmPopup v-if="deleteIsVisible" @close="deleteIsVisible = false" @confirm="deletePost">
                Êtes-vous sûr de vouloir supprimer ce post ?
            </ConfirmPopup>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from '@/views/base/BaseAuth.vue';
import axios from '@/axios'
import PostSingleLoader from '@/components/loaders/PostSingleLoader.vue';
import PostSingle from '@/components/post/PostSingle.vue';
import store from '@/store';
import PostEditForm from '@/components/post/forms/PostEditForm.vue';
import ConfirmPopup from '@/components/partials/popup/ConfirmPopup.vue';
import PostReplies from '@/components/post/PostReplies.vue';

export default {
    name: 'PostDetails',
    components: {
        BaseAuth,
        PostSingleLoader,
        PostReplies,
        PostSingle,
        PostEditForm,
        ConfirmPopup
    },
    data () {
        return {
            user: store.state.auth.user,
            postId: null,
            post: null,
            isEdited: false,
            deleteIsVisible: false
        }
    },
    mounted () {
        this.postId = this.$route.params.id
        this.fetchPost();
    },
    methods: {
        fetchPost () {
            axios.get(`/api/posts/${this.postId}`).then(res => {
                    this.post = res.data.post;
                }).catch(() => {
                    // TODO: rediriger sur une 404
                })
        },
        editPost (editedPost) {
            this.post = editedPost;
            this.isEdited = false;
        },
        deletePost () {
            axios.delete(`/api/posts/${this.post.id}`).then(() => {
                this.$router.push({ name: 'Post' })
            }).catch(() => {
                // TODO: Gérer l'erreur
            })
        }
    }
}
</script>

<style>

</style>
