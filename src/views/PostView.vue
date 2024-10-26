<template>
    <BaseAuth>
        <div>
            <div class="w-3/5 mt-8">
                <PostForm @new-post="addPost" />
                <div class="mt-4 mb-32">
                    <div class="sticky top-[62px]" style="z-index: 1;">
                        <div class="bg-white pt-4">
                            <TabNav :tabs="tabs" :default-tab="activeTab" @select="setTab" />
                        </div>
                    </div>
                    <div class="mt-4 flex flex-col gap-4">
                        <template v-if="!isBusy">
                            <PostSingle v-for="post in posts" :key="post.id" :post="post" @update-survey="updateSurvey" />
                            <div class="flex justify-center">
                                <PaginatorSelect v-model="currentPage" :last-page="lastPage" @change="fetchPosts" />
                            </div>
                        </template>
                        <template v-else>
                            <PostSingleLoader v-for="i in 3" :key="i" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from './BaseAuth.vue';
import TabNav from '@/components/TabNav.vue';
import PaginatorSelect from '@/components/PaginatorSelect.vue';
import PostForm from '@/components/PostForm.vue';
import PostSingle from '@/components/PostSingle.vue';
import PostSingleLoader from '@/components/PostSingleLoader.vue';
import axios from '../axios'

export default {
    name: 'PostView',
    components: {
        BaseAuth,
        TabNav,
        PostSingle,
        PostSingleLoader,
        PaginatorSelect,
        PostForm
    },
    data () {
        return {
            posts: [],
            isBusy: false,
            activeTab: null,
            currentPage: 1,
            lastPage: null,
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
    methods: {
        setTab (newTab) {
            this.activeTab = newTab;
            this.fetchPosts();
        },
        fetchPosts () {
            this.isBusy = true
            axios.get(`/api/posts/${this.activeTab}?page=${this.currentPage}`).then(res => {
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
        }
    }
}
</script>

<style>

</style>
