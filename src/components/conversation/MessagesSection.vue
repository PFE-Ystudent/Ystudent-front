<template>
    <div class="border border-selected rounded-md" style="height: 85vh;">
        <div class="h-12 bg-selected px-8 flex items-center justify-between border-b border-selected rounded-t-md" >
            <div class="font-semibold text-lg flex items-center gap-4">
                <font-awesome-icon icon="fa-solid fa-comments" class="text-sky-300" size="lg" />
                <div>
                    {{ authUser.id === conversation.requester.id ? conversation.user.username : conversation.requester.username }}
                </div>
            </div>
        </div>
        <div class="px-2 overflow-y-scroll flex flex-col-reverse pb-2" style="height: calc(85vh - 122px)">
            <template v-if="!isBusy || !conversation.lastMessage">
                <div v-for="(message, i) in messages" :key="message.id">
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
                <div v-if="!messages.length || (messages.length && messages[messages.length - 1].id === messageBoundary.first)" class="text-zinc-500 px-8 py-4">
                    <div class="text-5xl font-bold mb-3">Bonjour {{ authUser.username }},</div>
                    <div class="text-lg">
                        Ceci est le début de votre conversation avec <span class="font-semibold">{{ authUser.id === conversation.requester.id ? conversation.user.username : conversation.requester.username }}</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <MessageSingleLoader v-for="i in 9" :key="i" :isCurrentUser="[1, 2, 4, 6].includes(i)" :withAvatar="![1, 7, 8].includes(i)" />
            </template>
        </div>
        <div class="h-16 flex items-center gap-4 px-4 bg-secondary border-t border-selected rounded-b-md">
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
import MessageSingleLoader from '@/components/loaders/MessageSingleLoader.vue';

export default {
    name: 'MessagesSection',
    components: {
        MessageSingle,
        MessageSingleLoader
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
            },
            isBusy: false
        }
    },
    mounted () {
        this.isBusy = true
        this.fetchMessages().finally(() => {
            this.isBusy = false
        })
    },
    watch: {
        conversation () {
            this.isBusy = true
            this.fetchMessages().finally(() => {
                this.isBusy = false
            })
        }
    },
    methods: {
        async fetchMessages () {
            return await axios.get(`/api/conversations/${this.conversation.id}/messages`).then((res) => {
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