<template>
    <card class="w-full relative p-4 !border-sky-300">
        <div class="relative flex gap-2 items-center hover:bg-white hover:shadow-md cursor-pointer rounded-md max-w-min pl-1 pr-8">
            <UserAvatar class="w-8 h-8" :avatar="editedPost.author.avatar" />
            <div>
                <div>{{ editedPost.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
        <div class="text-xl font-semibold my-2">
            <text-input v-model="editedPost.title" placeholder="Titre" :errors="errors.title" />
        </div>
        <text-input v-model="editedPost.content" type="textarea" placeholder="Contenu" :errors="errors.content" />
        <div v-if="editedPost.surveys.length" class="flex flex-col gap-4">
            <PostSurvey v-for="survey in editedPost.surveys" :key="survey.id" :survey="survey" disabled />
        </div>
        <div class="flex justify-end gap-4 mt-4">
            <cancel-button @click="$emit('cancel')">
                Annuler
            </cancel-button>
            <submit-button @click="edit">
                Modifier
            </submit-button>
        </div>
    </card>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';
import axios from '@/axios';
import PostSurvey from '../integrations/PostSurvey.vue';

export default {
    name: 'PostEditForm',
    components: {
        UserAvatar,
        PostSurvey
    },
    props: {
        post: {
            type: Object,
            required: true 
        },
    },
    data() {
        return {
            editedPost: {...this.post},
            errors: {}
        }
    },
    methods: {
        edit () {
            const data = {
                title: this.editedPost.title,
                content: this.editedPost.content
            }

            axios.patch(`/api/posts/${this.editedPost.id}`, data)
                .then(res => {
                    this.$emit('confirm', res.data);
                }).catch(err => {
                    this.errors = err.response.data.errors ?? {}
                });
        }
    },
}
</script>

<style scoped>
    
</style>