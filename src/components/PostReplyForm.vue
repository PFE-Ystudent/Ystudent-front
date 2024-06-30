<template>
    <CardForm>
        <div v-if="showPostReplyForm" class="flex flex-col">
            <div class="flex gap-4">
                <div class="flex gap-2 items-center">
                    <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
                    <div>
                        <div>{{ user.username }}</div>
                        <div class="text-xs text-zinc-400">Membre</div>
                    </div>
                </div>
            </div>
            <TextInput type="textarea" :default-value="replyContent" @update="(val) => replyContent = val" :errors="errors.replyContent" />
        </div>
        <div class="w-full flex justify-end gap-4">
            <CancelButton v-if="showPostReplyForm" @click="hidePostReplyForm">
                Annuler
            </CancelButton>
            <SubmitButton @click="sendReply">
                <font-awesome-icon :icon="`fa-solid fa-${ showPostReplyForm ? 'paper-plane': 'plus'}`" />
                {{ showPostReplyForm ? 'Envoyer la réponse' : 'Répondre'}}
            </SubmitButton>
        </div>
    </CardForm>
</template>

<script>
import store from '../store';
import axios from '../axios';
import SubmitButton from '@/components/SubmitButton.vue';
import TextInput from '@/components/TextInput.vue';
import CancelButton from '@/components/CancelButton.vue';
import CardForm from './CardForm.vue';

export default {
    name: 'PostForm',
    components: {
        CancelButton,
        SubmitButton,
        TextInput,
        CardForm
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
            errors: {}
        }
    },
    methods: {
        sendReply () {
            if (!this.showPostReplyForm) {
                this.showPostReplyForm = true;
                return
            }
            axios.post(`/api/posts/${this.postId}/replies`, { content: this.replyContent }).then(res => {
                    this.hidePostReplyForm()
                    this.replyContent = null;
                    this.$emit('newReply', res.data)
                })
                .catch(err => {
                    this.errors = err.response.data.errors ?? {}
                });
        },
        hidePostReplyForm () {
            this.showPostReplyForm = false
            this.errors = {}
        }
    }
}
</script>

<style>

</style>
