<template>
    <div class="border border-sky-300 rounded-md" style="height: 85vh;">
        <div class="h-12 bg-sky-50 px-8 flex items-center justify-between border-b border-sky-300 rounded-t-md" >
            <div class="font-semibold text-lg flex items-center gap-4">
                <font-awesome-icon icon="fa-solid fa-comments" class="text-sky-300" size="lg" />
                <div>
                    {{ authUser.id === conversation.requester.id ? conversation.user.username : conversation.requester.username }}
                </div>
            </div>
        </div>
        <div class="px-2 overflow-y-scroll flex flex-col-reverse pb-2" style="height: calc(85vh - 122px)">
            <div v-for="(message, i) in messages" :key="message.id">
                <div v-if="messageBoundary.first === message.id" class="text-zinc-500 px-8 py-4">
                    <div class="text-5xl font-bold mb-3">Bonjour {{ authUser.username }},</div>
                    <div class="text-lg">
                        Ceci est le début de votre conversation avec <span class="font-semibold">{{ authUser.id === conversation.requester.id ? conversation.user.username : conversation.requester.username }}</span>
                    </div>
                </div>
                <div v-if="i === messages.length - 1 || (i <= messages.length - 1 && formatDate(message.createdAt) !== formatDate(messages[i + 1].createdAt))"
                     class="flex items-center text-zinc-500 gap-4 my-2">
                    <div class="w-full h-px border-b border-zinc-500"></div>
                    <div class="text-nowrap">{{ formatTimestamp(message.createdAt) }}</div>
                    <div class="w-full h-px border-b border-zinc-500"></div>
                </div>
                <MessageSingle :message="message"
                    :withAvatar="i === messages.length - 1 || (i <= messages.length - 1 && message.sender.id != messages[i + 1].sender.id) || formatDate(message.createdAt) != formatDate(messages[i + 1].createdAt)"
                    :isCurrentUser="message.sender.id == authUser.id" />
            </div>
        </div>
        <div class="h-16 flex items-center gap-4 px-4 bg-zinc-50 border-t border-sky-300 rounded-b-md">
            <textarea rows="1" class="w-full resize-none flex border rounded-md shadow hover:outline-none outline-none border-zinc-300 focus:border-zinc-600 p-1"></textarea>
            <submit-button class="h-8">
                <font-awesome-icon icon="fa-solid fa-paper-plane" class="text-white" />
            </submit-button>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import MessageSingle from './MessageSingle.vue';
import axios from '@/axios';
import formatDate from '@/mixins/formatDate';

export default {
    name: 'MessagesSection',
    components: {
        MessageSingle
    },
    mixins: [formatDate],
    props: {
        conversation: {
            type: Object,
            required: true 
        }
    },
    data() {
        return {
            authUser: store.state.auth.user,
            messages: [],
            messageBoundary: {
                first: null,
                last: null
            }
        }
    },
    mounted () {
        this.fetchMessages()
    },
    watch: {
        conversation () {
            this.fetchMessages()
        }
    },
    methods: {
        fetchMessages () {
            axios.get(`/api/conversations/${this.conversation.id}/messages`).then((res) => {
                this.messages = res.data.messages;
                this.messageBoundary.first = res.data.firstMessageId;
                this.messageBoundary.last = res.data.lastMessageId;
            })
        }
    },
}
</script>

<style scoped>

</style>