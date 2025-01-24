<template>
    <div class="flex gap-4 mt-8">
        <div class="w-3/5">
            <PostForm @new-post="addPost" :categories="categories" />
            <div class="mt-4 mb-32">
                <div class="sticky top-[62px]" style="z-index: 1;">
                    <div class="bg-white pt-4">
                        <TabNav :tabs="tabs" :default-tab="activeTab" @select="setTab" />
                    </div>
                </div>
                <div class="mt-4 flex flex-col gap-4">
                    <template v-if="!isBusy">
                        <div v-for="post in posts" :key="post.id">
                            <PostSingle v-if="postIdToEdit !== post.id" :post="post"
                                        @update-survey="updateSurvey" @deletePost="postIdToDelete = $event" @editPost="postIdToEdit = $event" />
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
        </div>
        <div class="w-2/5">
            <div class="w-2/3 mx-auto sticky top-[78px]">
                <PostFilter :categories="categories" @filter="filter" />
            </div>
            <ConfirmPopup v-if="postIdToDelete" @close="postIdToDelete = null" @confirm="deletePost">
                Êtes-vous sûr de vouloir supprimer ce post ?
            </ConfirmPopup>
        </div>
    </div>
</template>

<script>
import TabNav from '@/components/partials/TabNav.vue';
import PaginatorSelect from '@/components/partials/PaginatorSelect.vue';
import PostForm from '@/components/post/forms/PostForm.vue';
import PostSingle from '@/components/post/PostSingle.vue';
import PostSingleLoader from '@/components/loaders/PostSingleLoader.vue';
import axios from '@/axios'
import PostFilter from '@/components/post/filters/PostFilter.vue';
import formatFilterData from '@/mixins/formatFilterData';
import ConfirmPopup from '@/components/partials/popup/ConfirmPopup.vue';
import PostEditForm from '@/components/post/forms/PostEditForm.vue';

export default {
    name: 'PostView',
    components: {
        TabNav,
        PostSingle,
        PostSingleLoader,
        PaginatorSelect,
        PostForm,
        PostFilter,
        ConfirmPopup,
        PostEditForm
    },
    mixins: [formatFilterData],
    data () {
        return {
            posts: [],
            categories: [],
            isBusy: false,
            activeTab: null,
            currentPage: 1,
            lastPage: null,
            filterData: null,
            postIdToDelete: null,
            postIdToEdit: null,
            tabs: [
                {name: "Nouveaux posts", value: "new"},
                {name: "Posts suivis", value: "followed"},
                {name: "Vos posts", value: "me"},
            ]
        }
    },
    created () {
        this.setTab(this.tabs[0].value);
    },
    mounted () {
        this.fetchCategories()
    },
    methods: {
        fetchCategories () {
            axios.get('/api/categories').then(res => {
                this.categories = res.data.categories;
            });
        },
        setTab (newTab) {
            this.activeTab = newTab;
            this.fetchPosts();
        },
        fetchPosts () {
            this.isBusy = true
            axios.get(`/api/posts/${this.activeTab}?page=${this.currentPage}&${this.formatFilterData(this.filterData)}`).then(res => {
                    this.posts = res.data.posts;
                    this.lastPage = res.data.lastPage;
                }).finally(() => {
                    this.isBusy = false
                })
        },
        addPost (newPost) {
            if (this.activeTab === 'me') {
                this.posts = [newPost, ...this.posts]
            }
        },
        updateSurvey (e) {
            const post = this.posts.find(p => p.id === e.postId);
            const surveyIndex = post.surveys.findIndex(s => s.id === e.survey.id);
            post.surveys[surveyIndex] = e.survey;
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
        filter (data) {
            this.filterData = data
            this.fetchPosts();
        }
    }
}
</script>

<style>

</style>
