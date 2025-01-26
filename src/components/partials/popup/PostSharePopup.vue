<template>
    <PopupContainer @close="close">
        <div class="text-xl font-semibold mb-2">Partager le post</div>
        <hr class="mb-2">
        <user-select-input v-model="selectedUsers" :options="users" :isBusy="isBusy" label="Avec :" max="5" :errors="errors.users" />
        <text-input v-model="content" label="Message :" placeholder="Message" :errors="errors.content" />
        <PostSingle :post="post" is-details />
        <div class="mt-8 flex gap-4 justify-end">
            <cancel-button @click="close">
                Annuler
            </cancel-button>
            <submit-button @click="share">
                Partager
            </submit-button>
        </div>
    </PopupContainer>
</template>

<script>
import axios from '@/axios';
import PopupContainer from '@/components/partials/popup/PopupContainer.vue';
import PostSingle from '@/components/post/PostSingle.vue';

export default {
    name: 'PostSharePopup',
    components: {
        PopupContainer,
        PostSingle
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedUsers: [],
            content: null,
            users: [],
            errors: {}
        }
    },
    mounted () {
        this.fetchContacts()
    },
    methods: {
        close () {
            this.$emit('close');
        },
        share () {
            axios.post(`/api/posts/${this.post.id}/share`, {
                users: this.selectedUsers.map(u => u.id),
                content: this.content
            }).then((res) => {
                this.close();
            }).catch((err) => {
                this.errors = err.response.data.errors
            });
            
        },
        fetchContacts () {
            axios.get('/api/users/relations/contact/select').then((res) => {
                this.users = res.data;
            })
        }
    }
};
</script>

<style scoped>

</style>