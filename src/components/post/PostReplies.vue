<template>
    <div class="w-full">
        <div class="sticky top-[62px]" style="z-index: 1;">
            <div class="bg-white pt-4">
                <PostReplyForm :post-id="postId" @new-reply="addReply" />
            </div>
        </div>
        <div class="mt-4 flex flex-col gap-4">
            <template v-if="!isBusy">
                <div v-for="postReply in postReplies" :key="postReply.id">
                    <PostReplySingle v-if="postReplyIdToEdit !== postReply.id" :post-reply="postReply" @update="update(postReply.id, $event)" @editPostReply="postReplyIdToEdit = $event" @deletePostReply="postReplyIdToDelete = $event" />
                    <PostReplyEdit v-else :post-reply="postReply" @cancel="postReplyIdToEdit = null" @confirm="editPostReply" />
                </div>
            </template>
            <template v-else>
                <PostReplySingleLoader v-for="i in 3" :key="i" />
            </template>
        </div>
        <ConfirmPopup v-if="postReplyIdToDelete" @close="postReplyIdToDelete = null" @confirm="deletePost">
            Êtes-vous sûr de vouloir supprimer cette réponse ?
        </ConfirmPopup>
    </div>
</template>

<script>
import axios from '@/axios'
import PostReplyForm from '@/components/post/forms/PostReplyForm.vue';
import PostReplySingle from '@/components/post/PostReplySingle.vue';
import PostReplySingleLoader from '@/components/loaders/PostReplySingleLoader.vue';
import PostReplyEdit from '@/components/post/forms/PostReplyEdit.vue';
import ConfirmPopup from '@/components/partials/popup/ConfirmPopup.vue';

export default {
    name: 'PostReplies',
    components: {
        PostReplyForm,
        PostReplySingle,
        PostReplySingleLoader,
        PostReplyEdit,
        ConfirmPopup
    },
    props: {
        postId: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            isBusy: true,
            postReplies: [],
            postReplyIdToEdit: null,
            postReplyIdToDelete: null
        }
    },
    mounted () {
        this.fetchPostReplies();
    },
    methods: {
        fetchPostReplies () {
            this.isBusy = true;
            axios.get(`/api/posts/${this.postId}/replies`).then(res => {
                    this.postReplies = res.data.postReplies;
                }).catch(() => {
                    // TODO: rediriger sur une 404
                }).finally(() => {
                    this.isBusy = false;
                })
        },
        editPostReply (editedPostReply) {
            this.postReplies = this.postReplies.map(p => {
                if (p.id === editedPostReply.id) {
                    return editedPostReply
                }
                return p
            });
            this.postReplyIdToEdit = null;
        },
        addReply (newReply) {
            this.postReplies.push(newReply);
        },
        update (postReplyId, data) {
            const postReply = this.postReplies.find(p => p.id === postReplyId);
            for (const [key, val] of Object.entries(data)) {
                postReply[key] = val;
                
            }
        },
        deletePost () {
            const postReplyId = this.postReplyIdToDelete
            axios.delete(`/api/posts/replies/${postReplyId}`).then(() => {
                this.postReplies = this.postReplies.filter(p => p.id !== postReplyId);
            }).catch(() => {
                // TODO: Gérer l'erreur
            })
        },
    },
}
</script>

<style scoped>

</style>