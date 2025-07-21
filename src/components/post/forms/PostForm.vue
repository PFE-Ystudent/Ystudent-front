<template>
    <CardForm>
        <div v-if="showPostForm"
             class="flex flex-col">
            <div class="flex gap-4">
                <div class="flex gap-2 items-center">
                    <UserAvatar class="w-8 h-8"
                                :avatar="user.avatar" />
                    <div>
                        <div>{{ user.username }}</div>
                        <div class="text-xs text-zinc-400">
                            {{ user.role.name }}
                        </div>
                    </div>
                </div>
                <text-input v-model="newPost.title"
                            :errors="errors.title" />
            </div>
            <text-input v-model="newPost.content"
                        type="textarea"
                        :errors="errors.content" />
            <select-input v-model="newPost.categories"
                          label="Catégories :"
                          multiple
                          :options="categories"
                          :errors="errors.categories" />
            <div class="flex flex-col gap-4">
                <template v-for="(integration, index) in integrations">
                    <SurveyForm v-if="integration.type === 'survey'"
                                :key="index"
                                :survey="integration.data"
                                class="mb-4"
                                @update="integration.data = $event"
                                @delete="deleteIntegration(index)" />
                    <div v-if="integration.type === 'annonce'"
                         :key="index">
                        Annonce
                    </div>
                </template>
                <div v-if="filesInput">
                    <upload-input id="upload"
                                  accept="image/*"
                                  multiple
                                  @select-files="selectFile" />
                </div>
                <PostFiles v-if="previewfiles.length"
                           :files="previewfiles" />
            </div>
        </div>
        <div class="w-full flex justify-between">
            <div class="relative">
                <div v-if="showPostForm"
                     class="flex gap-4">
                    <button class="text-zinc-400 hover:text-primary"
                            @click="filesInput = true">
                        <font-awesome-icon icon="fa-solid fa-images"
                                           size="lg" />
                    </button>
                    <button class="text-zinc-400 hover:text-primary"
                            data-testid="add-survey"
                            @click="addIntegration('survey')">
                        <font-awesome-icon icon="fa-solid fa-square-poll-vertical"
                                           size="lg" />
                    </button>
                    <button class="text-zinc-400 hover:text-primary"
                            @click="addIntegration('annonce')">
                        <font-awesome-icon icon="fa-solid fa-bullhorn"
                                           size="lg" />
                    </button>
                </div>
            </div>
            <div class="flex gap-4">
                <cancel-button v-if="showPostForm"
                               @click="hidePostForm">
                    Annuler
                </cancel-button>
                <submit-button :icon="showPostForm ? 'fa-paper-plane': 'fa-plus'"
                               :is-busy="isBusy"
                               @click="sendPost">
                    {{ showPostForm ? 'Envoyer le post' : 'Ecrire un post' }}
                </submit-button>
            </div>
        </div>
    </CardForm>
</template>

<script>
import store from '@/store';
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';
import SurveyForm from '@/components/post/integrations/forms/SurveyForm.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';
import PostFiles from '../PostFiles.vue';

export default {
    name: 'PostForm',
    components: {
        CardForm,
        SurveyForm,
        UserAvatar,
        PostFiles
    },
    props: {
        categories: {
            type: Array,
            default: () => []
        },
    },
    data () {
        return {
            user: store.state.auth.user,
            showPostForm: false,
            newPost: {
                title: null,
                content: null,
                categories: []
            },
            integrations: [],
            filesInput: false,
            files: [],
            previewfiles: [],
            errors: {},
            isBusy: false
        };
    },
    methods: {
        sendPost () {
            if (!this.showPostForm) {
                this.showPostForm = true;
                return;
            }
            if (this.isBusy) {
                return;
            }
            this.isBusy = true;
            axios.post('/api/posts', {
                ...this.newPost,
                categories: this.newPost.categories.map(c => c.id),
                integrations: this.integrations
            }).then(res => {
                    this.hidePostForm();
                    this.newPost = {
                        title: null,
                        content: null,
                        categories: []
                    };
                    this.uploadFile(res.data.id);
                    this.integrations = [];
                    this.$emit('new-post', res.data);
                })
                .catch(err => {
                    this.errors = err.response.data.errors ?? {};
                }).finally(() => {
                    this.isBusy = false;
                });
        },
        hidePostForm () {
            this.showPostForm = false;
            this.errors = {};
        },
        selectFile (files) {
            this.previewfiles = [];
            if (files.length) {
                for (const file of files) {
                    this.previewfiles.push({ url: URL.createObjectURL(file) });
                }
                this.files = files;
            }
        },
        uploadFile (postId) {
            const formData = new FormData();
            for (const file of this.files) {
                formData.append('files[]', file);
            }
            axios.post(`/api/posts/${postId}/files`, formData).then((res) => {
                console.log(res);
                this.files = [];
            });
        },
        addIntegration (action) {
            this.integrations.push({ type: action, data: null });
        },
        deleteIntegration (index) {
            this.integrations = this.integrations.filter((o, i) => i !== index);
        }
    }
};
</script>

<style scoped>

</style>
