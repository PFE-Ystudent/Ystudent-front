<template>
    <div class="flex flex-col md:flex-row mt-8">
        <div class="w-full md:w-1/5 flex justify-between md:justify-end md:px-8 mb-4 md:mb-0">
            <div>
                <button class="flex gap-4 items-center text-zinc-400 hover:text-color cursor-pointer"
                        @click="$router.push({ name: 'Post' })">
                    <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                    <div class="mb-[3px]">
                        Retour
                    </div>
                </button>
            </div>

            <div v-if="post && !isDesktop"
                 class="w-auto md:w-1/5 pl-4 flex flex-col items-start gap-4">
                <submit-button @click="isShared = true">
                    <font-awesome-icon icon="fa-solid fa-share-from-square" />
                    Partager
                </submit-button>
                <template v-if="user.id === post.author.id">
                    <submit-button @click="isEdited = true">
                        Modifier
                    </submit-button>
                    <submit-button @click="deleteIsVisible = true">
                        Supprimer
                    </submit-button>
                </template>
                <cancel-button v-else>
                    Signaler
                </cancel-button>
            </div>
        </div>
        <div class="w-full md:w-3/5">
            <template v-if="post">
                <PostSingle v-if="!isEdited"
                            :post="post"
                            is-details />
                <PostEditForm v-else
                              :post="post"
                              @cancel="isEdited = false"
                              @confirm="editPost" />
            </template>
            <PostSingleLoader v-else />
            <div v-if="postId"
                 class="px-2 md:px-4 mb-32">
                <PostReplies :post-id="postId" />
            </div>
        </div>
        <div v-if="post && isDesktop"
             class="w-full md:w-1/5 pl-4 flex flex-col items-start gap-4">
            <submit-button @click="isShared = true">
                <font-awesome-icon icon="fa-solid fa-share-from-square" />
                Partager
            </submit-button>
            <template v-if="user.id === post.author.id">
                <submit-button @click="isEdited = true">
                    Modifier
                </submit-button>
                <submit-button @click="deleteIsVisible = true">
                    Supprimer
                </submit-button>
            </template>
            <cancel-button v-else>
                Signaler
            </cancel-button>
        </div>
        <ConfirmPopup v-if="deleteIsVisible"
                      @close="deleteIsVisible = false"
                      @confirm="deletePost">
            Êtes-vous sûr de vouloir supprimer ce post ?
        </ConfirmPopup>
        <PostSharePopup v-if="isShared && post"
                        :post="post"
                        @close="isShared = false" />
    </div>
</template>

<script>
import axios from '@/axios';
import PostSingleLoader from '@/components/loaders/PostSingleLoader.vue';
import PostSingle from '@/components/post/PostSingle.vue';
import store from '@/store';
import PostEditForm from '@/components/post/forms/PostEditForm.vue';
import ConfirmPopup from '@/components/partials/popup/ConfirmPopup.vue';
import PostReplies from '@/components/post/PostReplies.vue';
import PostSharePopup from '@/components/partials/popup/PostSharePopup.vue';

export default {
    name: 'PostDetails',
    components: {
        PostSingleLoader,
        PostReplies,
        PostSingle,
        PostEditForm,
        ConfirmPopup,
        PostSharePopup
    },
    data () {
        return {
            user: store.state.auth.user,
            postId: null,
            post: null,
            isEdited: false,
            isShared: false,
            deleteIsVisible: false,
            isDesktop: window.innerWidth >= 768
        };
    },
    mounted () {
        this.postId = this.$route.params.id;
        this.fetchPost();
    },
    methods: {
        fetchPost () {
            axios.get(`/api/posts/${this.postId}`).then(res => {
                    this.post = res.data.post;
                }).catch(() => {
                    // TODO: rediriger sur une 404
                });
        },
        editPost (editedPost) {
            this.post = editedPost;
            this.isEdited = false;
        },
        deletePost () {
            axios.delete(`/api/posts/${this.post.id}`).then(() => {
                this.$router.push({ name: 'Post' });
            }).catch(() => {
                // TODO: Gérer l'erreur
            });
        }
    }
};
</script>

<style>

</style>
