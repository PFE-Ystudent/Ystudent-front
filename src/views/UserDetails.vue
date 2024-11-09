<template>
    <BaseAuth>
        <div>
            <div class="flex gap-4 mt-4">
                <div class="w-3/5">
                    <UserProfile v-if="user" :user="user" />
                    <UserProfileLoader v-else />
                </div>
                <div>
                    <SubmitButton>
                        Envoyer un message
                    </SubmitButton>
                    <SubmitButton class="mt-4">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Ajouter
                    </SubmitButton>
                    <CancelButton class="mt-4">
                        Signaler
                    </CancelButton>
                </div>
            </div>
            <div class="w-3/5">
                <div class="mt-8 flex flex-col gap-4 mb-32">
                    <template v-if="!isBusy">
                        <PostSingle v-for="post in posts" :key="post.id" :post="post" @update-survey="updateSurvey" />
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
        </div>
    </BaseAuth>
</template>

<script>
import PostSingle from '@/components/PostSingle.vue';
import BaseAuth from './BaseAuth.vue';
import PostSingleLoader from '@/components/PostSingleLoader.vue';
import PaginatorSelect from '@/components/PaginatorSelect.vue';
import axios from '@/axios';
import SubmitButton from '@/components/SubmitButton.vue';
import CancelButton from '@/components/CancelButton.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserProfileLoader from '@/components/UserProfileLoader.vue';

export default {
    name: 'userDetails',
    components: {
        BaseAuth,
        PostSingle,
        PostSingleLoader,
        PaginatorSelect,
        UserProfile,
        SubmitButton,
        CancelButton,
        UserProfileLoader
    },
    data() {
        return {
            userId: null,
            posts: [],
            user: null,
            currentPage: 1,
            lastPage: null,
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
        updateSurvey (e) {
            const post = this.posts.find(p => p.id === e.postId);
            const surveyIndex = post.surveys.findIndex(s => s.id === e.survey.id);
            post.surveys[surveyIndex] = e.survey;
        },
    },
}
</script>

<style scoped>

</style>