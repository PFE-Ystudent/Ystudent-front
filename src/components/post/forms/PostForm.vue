<template>
    <CardForm>
        <div v-if="showPostForm" class="flex flex-col">
            <div class="flex gap-4">
                <div class="flex gap-2 items-center">
                    <UserAvatar class="w-8 h-8" :avatar="user.avatar" />
                    <div>
                        <div>{{ user.username }}</div>
                        <div class="text-xs text-zinc-400">Membre</div>
                    </div>
                </div>
                <text-input v-model="newPost.title" :errors="errors.title" />
            </div>
            <text-input type="textarea" v-model="newPost.content" :errors="errors.content" />
            <div class="flex flex-col gap-4">
                <template v-for="(integration, index) in integrations">
                    <SurveyForm v-if="integration.type === 'survey'" :key="index" :survey="integration.data" @update="integration.data = $event" @delete="deleteIntegration(index)" />
                    <div v-if="integration.type === 'annonce'" :key="index">
                        Annonce
                    </div>
                </template>
            </div>
            <div class="flex justify-end relative">
                <TooltipAction :actions="actions" @selectAction="addIntegration">
                    <span class="text-xs text-sky-300 hover:text-sky-400 hover:underline font-semibold cursor-pointer">
                        Ajouter une intégration
                    </span>
                </TooltipAction>
            </div>
            <select-input v-model="newPost.categories" label="Catégories :" multiple :options="categories" :errors="errors.categories" />
        </div>
        <div class="w-full flex justify-end gap-4">
            <cancel-button v-if="showPostForm" @click="hidePostForm">
                Annuler
            </cancel-button>
            <submit-button @click="sendPost">
                <font-awesome-icon :icon="`fa-solid fa-${ showPostForm ? 'paper-plane': 'plus'}`" />
                {{ showPostForm ? 'Envoyer le post' : 'Ecrire un post'}}
            </submit-button>
        </div>
    </CardForm>
</template>

<script>
import store from '@/store';
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import SurveyForm from '@/components/post/integrations/forms/SurveyForm.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';

export default {
    name: 'PostForm',
    components: {
        CardForm,
        TooltipAction,
        SurveyForm,
        UserAvatar
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
            actions: [
                {value: 'survey', label: 'Sondage'},
                {value: 'annonce', label: 'Annonce'},
            ],
            integrations: [],
            errors: {}
        }
    },
    methods: {
        sendPost () {
            if (!this.showPostForm) {
                this.showPostForm = true;
                return
            }
            axios.post('/api/posts', {
                ...this.newPost,
                categories: this.newPost.categories.map(c => c.id),
                integrations: this.integrations
            }).then(res => {
                    this.hidePostForm()
                    this.newPost = {
                        title: null,
                        content: null,
                        categories: []
                    }
                    this.integrations = [];
                    this.$emit('newPost', res.data)
                })
                .catch(err => {
                    this.errors = err.response.data.errors ?? {}
                });
        },
        hidePostForm () {
            this.showPostForm = false
            this.errors = {}
        },
        addIntegration (action) {
            this.integrations.push({type: action, data: null});
        },
        deleteIntegration(index) {
            this.integrations = this.integrations.filter((o, i) => i !== index)
        }
    }
}
</script>

<style scoped>

</style>
