<template>
    <CardForm>
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
                <font-awesome-icon :icon="`fa-solid fa-${ showPostForm ? 'paper-plane': 'plus'}`" />
                {{ showPostForm ? 'Envoyer le post' : 'Ecrire un post'}}
            </SubmitButton>
        </div>
    </CardForm>
</template>

<script>
import store from '../store';
import axios from '../axios';
import SubmitButton from '@/components/SubmitButton.vue';
import TextInput from '@/components/TextInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import CancelButton from '@/components/CancelButton.vue';
import CardForm from './CardForm.vue';

export default {
    name: 'PostForm',
    components: {
        CancelButton,
        SubmitButton,
        TextInput,
        SelectInput,
        CardForm
    },
    data () {
        return {
            user: store.state.auth.user,
            showPostForm: false,
            categories: [],
            newPost: {
                title: null,
                content: null,
                categories: []
            },
            errors: {}
        }
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
                    this.$emit('newPost', res.data)
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
