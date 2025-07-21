<template>
    <div class="bg-body border border-selected rounded-md text-color"
         style="height: 85vh">
        <div class="h-12 bg-selected px-8 flex items-center justify-between border-b border-selected rounded-t-md">
            <div class="font-semibold text-lg flex items-center gap-4">
                <font-awesome-icon icon="fa-solid fa-comments"
                                   class="text-sky-300"
                                   size="lg" />
                <div>
                    {{ authUser.id === conversation.requester.id ? conversation.user.username : conversation.requester.username }}
                </div>
            </div>
        </div>
        <div class="px-2 overflow-y-scroll flex flex-col-reverse pb-2"
             style="height: calc(85vh - 114px)">
            <template v-if="!isBusy || !conversation.lastMessage">
                <div v-for="(message, i) in messages"
                     :key="message.id">
                    <div v-if="i === messages.length - 1 || (i <= messages.length - 1 && formatDate(message.createdAt) !== formatDate(messages[i + 1].createdAt))"
                         class="flex items-center text-muted gap-4 my-2">
                        <div class="w-full h-px border-b border-muted" />
                        <div class="text-nowrap">
                            {{ formatTimestamp(message.createdAt) }}
                        </div>
                        <div class="w-full h-px border-b border-muted" />
                    </div>
                    <MessageSingle :message="message"
                                   :with-avatar="i === messages.length - 1 || (i <= messages.length - 1 && message.sender.id != messages[i + 1].sender.id) || formatDate(message.createdAt) != formatDate(messages[i + 1].createdAt)"
                                   :is-current-user="message.sender.id == authUser.id"
                                   @update="updateMessage"
                                   @delete="deleteMessage" />
                </div>
                <div v-if="!messages.length || (messages.length && messages[messages.length - 1].id === messageBoundary.first)"
                     class="text-muted px-8 py-4">
                    <div class="text-5xl font-bold mb-3">
                        Bonjour {{ authUser.username }},
                    </div>
                    <div class="text-lg">
                        Ceci est le début de votre conversation avec <span class="font-semibold">{{ authUser.id ===
                            conversation.requester.id ? conversation.user.username : conversation.requester.username
                        }}</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <MessageSingleLoader v-for="i in 9"
                                     :key="i"
                                     :is-current-user="[1, 2, 4, 6].includes(i)"
                                     :with-avatar="![1, 7, 8].includes(i)" />
            </template>
        </div>
        <div class="h-16 flex items-center gap-4 px-4 bg-secondary border-t border-selected rounded-b-md">
            <textarea v-model="newMessage"
                      rows="1"
                      class="w-full resize-none flex border rounded-md shadow hover:outline-none outline-none border-secondary bg-body focus:border-zinc-600 p-1"
                      @keydown.enter="sendMessage($event)" />
            <submit-button class="h-8"
                           @click="sendMessage()">
                <font-awesome-icon icon="fa-solid fa-paper-plane"
                                   class="text-white" />
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
import echo from '@/echo';

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
    data () {
        return {
            authUser: store.state.auth.user,
            messages: [],
            messageBoundary: {
                first: null,
                last: null
            },
            newMessage: null,
            waitSending: false,
            isBusy: false
        };
    },
    watch: {
        conversation () {
            this.messages = [];
            this.isBusy = true;
            this.fetchMessages().finally(() => {
                this.isBusy = false;
            });
            this.disconnect();
            this.connect();
        }
    },
    beforeUnmount () {
        this.disconnect();
    },
    mounted () {
        this.isBusy = true;
        this.fetchMessages().finally(() => {
            this.isBusy = false;
        });
        this.connect();
    },
    methods: {
        async fetchMessages () {
            return await axios.get(`/api/conversations/${this.conversation.id}/messages`).then((res) => {
                this.messages = res.data.messages;
                this.messageBoundary.first = res.data.firstMessageId;
                this.messageBoundary.last = res.data.lastMessageId;
            });
        },
        updateMessage (message) {
            const updatedMessageId = this.messages.findIndex((m) => m.id === message.id);
            this.messages[updatedMessageId] = message;
        },
        deleteMessage (messageId) {
            this.messages = this.messages.filter((m) => m.id !== messageId);
        },
        sendMessage (e) {
            if (e) {
                if (e.keyCode !== 13 || (e.keyCode === 13 && e.shiftKey)) {
                    return;
                }
                e.preventDefault();
            }
            if (this.waitSending || !this.newMessage || !this.newMessage.replaceAll(' ', '')) {
                return;
            }
            this.waitSending = true;
            axios.post(`/api/conversations/${this.conversation.id}/messages`, { content: this.newMessage })
                .then((res) => {
                    this.addMessage(res.data.message);
                    this.newMessage = null;
                    this.waitSending = false;
                }).catch(() => {
                    // TODO: gérer l'erreur
                });
        },
        addMessage (message) {
            if (this.messages.length && this.messageBoundary.last === this.messages[0].id) {
                this.messages.unshift(message);
                this.messageBoundary.last = message.id;
            }
        },
        disconnect () {
            echo.disconnect(`Conversation.${this.conversation.id}`);
        },
        connect () {
            echo.private(`Conversation.${this.conversation.id}`)
                .listen('.message.create', (response) => {
                    if (response.message.sender.id !== this.authUser.id) {
                        this.addMessage(response.message);
                    }
                }).listen('.message.update', (response) => {
                    this.messages = this.messages.map((message) => {
                        return message.id === response.message.id ? response.message : message;
                    });
                }).listen('.message.delete', (response) => {
                    this.messages = this.messages.filter((message) => message.id !== response.messageId);
                });
        }
    },
};
</script>

<style scoped></style>