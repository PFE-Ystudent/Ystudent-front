<template>
    <CardForm>
        <div v-if="showPostReplyForm"
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
            </div>
            <text-input v-model="replyContent"
                        type="textarea"
                        :errors="errors.content" />
        </div>
        <div class="w-full flex justify-end gap-4">
            <cancel-button v-if="showPostReplyForm"
                           @click="hidePostReplyForm">
                Annuler
            </cancel-button>
            <submit-button :icon="showPostReplyForm ? 'fa-paper-plane': 'fa-plus'"
                           :is-busy="isBusy"
                           @click="sendReply">
                {{ showPostReplyForm ? 'Envoyer la réponse' : 'Répondre' }}
            </submit-button>
        </div>
    </CardForm>
</template>

<script>
import store from '@/store';
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';

export default {
    name: 'PostForm',
    components: {
        CardForm,
        UserAvatar
    },
    props: {
        postId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            user: store.state.auth.user,
            showPostReplyForm: false,
            categories: [],
            replyContent: null,
            errors: {},
            isBusy: false
        };
    },
    methods: {
        sendReply () {
            if (!this.showPostReplyForm) {
                this.showPostReplyForm = true;
                return;
            }
            if (this.isBusy) {
                return;
            }
            this.isBusy = true;
            axios.post(`/api/posts/${this.postId}/replies`, { content: this.replyContent }).then(res => {
                    this.hidePostReplyForm();
                    this.replyContent = null;
                    this.$emit('new-reply', res.data);
                })
                .catch(err => {
                    this.errors = err.response.data.errors ?? {};
                }).finally(() => {
                    this.isBusy = false;
                });
        },
        hidePostReplyForm () {
            this.showPostReplyForm = false;
            this.errors = {};
        }
    }
};
</script>

<style>

</style>
