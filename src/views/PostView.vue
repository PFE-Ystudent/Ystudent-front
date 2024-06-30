<template>
    <BaseAuth>
        <div>
            <div class="w-3/5 mt-8">
                <div class="wrapper w-full rounded-md border border-zinc-300 p-4">
                    <div v-if="showPostForm" class="flex flex-col">
                        <div class="flex gap-4">
                            <div class="flex gap-2 items-center">
                                <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
                                <div>
                                    <div>{{ user.username }}</div>
                                    <div class="text-xs text-zinc-400">Membre</div>
                                </div>
                            </div>
                            <TextInput :default-value="newPost.title" @update="(val) => newPost.title = val" :errors="errors.title" />
                        </div>
                        <TextInput type="textarea" :default-value="newPost.content" @update="(val) => newPost.content = val" :errors="errors.content" />
                        <SelectInput v-model="newPost.categories" label="Catégories :" multiple :options="categories" :errors="errors.categories" />
                    </div>
                    <div class="w-full flex justify-end gap-4">
                        <CancelButton v-if="showPostForm" @click="hidePostForm">
                            Annuler
                        </CancelButton>
                        <SubmitButton @click="sendPost">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                            {{ showPostForm ? 'Envoyer le post' : 'Ecrire un post'}}
                        </SubmitButton>
                    </div>
                </div>
                <div class="mt-4 mb-32">
                    <div class="sticky top-[62px]">
                        <div class="bg-white pt-4">
                            <TabNav :tabs="tabs" :default-tab="activeTab" @select="setTab" />
                        </div>
                    </div>
                    <div class="mt-4 flex flex-col gap-4">
                        <template v-if="!isBusy">
                            <PostSingle v-for="post in posts" :key="post.id" :post="post"/>
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
import store from '../store';
import TabNav from '@/components/TabNav.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import TextInput from '@/components/TextInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import CancelButton from '@/components/CancelButton.vue';
import PostSingle from '@/components/PostSingle.vue';
import PostSingleLoader from '@/components/PostSingleLoader.vue';
import axios from '../axios'

export default {
    name: 'PostView',
    components: {
        BaseAuth,
        TabNav,
        SubmitButton,
        TextInput,
        CancelButton,
        PostSingle,
        PostSingleLoader,
        SelectInput
    },
    data () {
        return {
            user: store.state.auth.user,
            showPostForm: false,
            posts: [],
            isBusy: false,
            newPost: {
                title: null,
                content: null,
                categories: []
            },
            errors: {},
            activeTab: null,
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
        setTab (newTab) {
            this.activeTab = newTab;
            this.fetchPosts();
        },
        fetchPosts () {
            this.isBusy = true
            axios.get(`/api/posts/${this.activeTab}`).then(res => {
                    this.posts = res.data.posts;
                    console.log(this.posts);
                }).finally(() => {
                    this.isBusy = false
                })
        },
        fetchCategories () {
            axios.get('/api/categories').then(res => {
                this.categories = res.data.categories;
            });
        },
        sendPost () {
            if (!this.showPostForm) {
                this.showPostForm = true;
                return
            }
            axios.post('/api/posts', {...this.newPost, categories: this.newPost.categories.map(c => c.id)}).then(res => {
                    this.hidePostForm()
                    this.newPost = {
                        title: null,
                        content: null,
                        categories: []
                    }
                    if (this.activeTab === 'me') {
                        this.posts = [res.data, ...this.posts]
                    }
                })
                .catch(err => {
                    this.errors = err.response.data.errors ?? {}
                });
        },
        hidePostForm () {
            this.showPostForm = false
            this.errors = {}
        }
    }
}
</script>

<style>

</style>
