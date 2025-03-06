<template>
    <div>
        <div class="flex gap-4 mt-4">
            <div class="w-3/5">
                <UserProfile v-if="user" :user="user" isSelected />
                <UserProfileLoader v-else isSelected />
            </div>
            <div>
                <submit-button>
                    Envoyer un message
                </submit-button>
                <submit-button class="mt-4">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                    Ajouter
                </submit-button>
                <cancel-button class="mt-4">
                    Signaler
                </cancel-button>
            </div>
        </div>
        <div class="w-3/5">
            <div class="mt-8 flex flex-col gap-4 mb-32">
                <template v-if="!isBusy">
                    <div v-for="post in posts" :key="post.id">
                            <PostSingle v-if="postIdToEdit !== post.id" :post="post"
                                        @update="updatePost" @deletePost="postIdToDelete = $event" @editPost="postIdToEdit = $event" @share="postToShare = post" />
                            <PostEditForm v-else :post="post" @cancel="postIdToEdit = null" @confirm="editPost" />
                        </div>
                    <div class="flex justify-center mt-4">
                        <PaginatorSelect v-if="posts.length" v-model="currentPage" :last-page="lastPage" @change="fetchPosts" />
                        <div v-else class="text-lg font-semibold flex items-center gap-4">
                            <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="text-sky-400" />
                            Pas de résultats
                        </div>
                    </div>
                </template>
                <template v-else>
                    <PostSingleLoader v-for="i in 3" :key="i" />
                </template>
            </div>
        </div>
        <ConfirmPopup v-if="postIdToDelete" @close="postIdToDelete = null" @confirm="deletePost">
            Êtes-vous sûr de vouloir supprimer ce post ?
        </ConfirmPopup>
        <PostSharePopup v-if="postToShare" :post="postToShare" @close="postToShare = null" />
    </div>
</template>

<script>
import PostSingle from '@/components/post/PostSingle.vue';
import PostSingleLoader from '@/components/loaders/PostSingleLoader.vue';
import PaginatorSelect from '@/components/partials/PaginatorSelect.vue';
import axios from '@/axios';
import UserProfile from '@/components/user/UserProfile.vue';
import UserProfileLoader from '@/components/loaders/UserProfileLoader.vue';
import PostEditForm from '@/components/post/forms/PostEditForm.vue';
import ConfirmPopup from '@/components/partials/popup/ConfirmPopup.vue';
import PostSharePopup from '@/components/partials/popup/PostSharePopup.vue';

export default {
    name: 'userDetails',
    components: {
        PostSingle,
        PostSingleLoader,
        PaginatorSelect,
        UserProfile,
        UserProfileLoader,
        PostEditForm,
        ConfirmPopup,
        PostSharePopup
    },
    data() {
        return {
            userId: null,
            posts: [],
            user: null,
            currentPage: 1,
            lastPage: null,
            postIdToDelete: null,
            postIdToEdit: null,
            postToShare: null,
            isBusy: false,

        }
    },
    computed: {
        createdAt () {
            return new Date(this.user.createdAt).toLocaleString('fr', { hour12: false, dateStyle: "short" }) 
        }
    },
    mounted () {
        this.userId = this.$route.params.id
        this.fetchUser();
        this.fetchPosts();
    },
    methods: {
        fetchUser () {
            axios.get(`/api/users/${this.userId}`).then(res => {
                    this.user = res.data;
                }).catch(() => {
                    // TODO: gérer l'erreur
                })
        },
        fetchPosts () {
            this.isBusy = true
            axios.get(`/api/users/${this.userId}/posts?page=${this.currentPage}`).then(res => {
                    this.posts = res.data.posts;
                    this.lastPage = res.data.lastPage;
                }).finally(() => {
                    this.isBusy = false
                })
        },
        editPost (editedPost) {
            this.posts = this.posts.map(p => {
                if (p.id === editedPost.id) {
                    return editedPost
                }
                return p
            });
            this.postIdToEdit = null;
        },
        deletePost () {
            const postId = this.postIdToDelete
            axios.delete(`/api/posts/${postId}`).then(() => {
                this.posts = this.posts.filter(p => p.id !== postId);
            }).catch(() => {
                // TODO: Gérer l'erreur
            })
        },
        updatePost ({ postId, field, value }) {
            const post = this.posts.find(p => p.id === postId);
            
            post[field] = value;
        }
    },
}
</script>

<style scoped>

</style>