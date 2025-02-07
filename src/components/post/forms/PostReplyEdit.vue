<template>
    <card class="w-full p-4 !border-sky-300 text-color">
        <div class="flex gap-2 items-center">
            <UserAvatar class="w-8 h-8" :avatar="postReply.author.avatar" />
            <div>
                <div>{{ postReply.author.username }}</div>
                <div class="text-xs text-zinc-400">{{ postReply.author.role.name }}</div>
            </div>
        </div>
        <div class="flex">
            <text-input v-model="editedPostReply.content" type="textarea" :errors="errors.content" />
        </div>
        <div class="flex justify-end gap-4">
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
import formatDate from '@/mixins/formatDate';
import axios from '@/axios';


export default {
    name: "PostReplyEdit",
    components: {
        UserAvatar
    },
    mixins: [formatDate],
    props: {
        postReply: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editedPostReply: {...this.postReply},
            errors: {}
        }
    },
    methods: {
        edit () {
            const data = {
                content: this.editedPostReply.content
            }

            axios.patch(`/api/posts/replies/${this.editedPostReply.id}`, data)
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