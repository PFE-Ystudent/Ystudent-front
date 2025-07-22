<template>
    <div class="w-full"
         style="height: 85vh;">
        <div v-if="conversations.length"
             class="mb-2 text-color mx-2 lg:mx-0 mt-4 lg:mt-0">
            <text-input v-model="search"
                        placeholder="Recherche"
                        clearable
                        no-margin
                        @input="filtered" />
        </div>
        <div class="flex flex-col gap-2 overflow-scroll mx-2 lg:mx-0"
             style="height: calc(85vh - 40px);">
            <template v-if="!isBusy">
                <ConversationSingle v-for="conversation in filteredConversations"
                                    :key="conversation.id"
                                    :conversation="conversation"
                                    :is-selected="selectedConversation.id === conversation.id"
                                    @click="selectConversation(conversation, true)" />
            </template>
            <template v-else>
                <ConversationSingleLoader v-for="i in 3"
                                          :key="i"
                                          :class="{'mt-10': i === 1}" />
            </template>
        </div>
    </div>
</template>

<script>
import ConversationSingle from '@/components/conversation/ConversationSingle.vue';
import axios from '@/axios';
import store from '@/store';
import ConversationSingleLoader from '@/components/loaders/ConversationSingleLoader.vue';

export default {
    name: 'ConversationsSection',
    components: {
        ConversationSingle,
        ConversationSingleLoader
    },
    data () {
        return {
            authUser: store.state.auth.user,
            conversations: [],
            filteredConversations: [],
            selectedConversation: {
                id: null
            },
            search: null,
            isBusy: false,
        };
    },
    mounted () {
        this.fetchConversations().then(() => {
            let conversation = null;
            if (this.$route.params.id) {
                conversation = this.conversations.find(c => c.id === parseInt(this.$route.params.id));
            } else if (this.conversations.length) {
                conversation = this.conversations[0];
            }
            if (conversation) {
                this.selectConversation(conversation);
            }
        });
    },
    methods: {
        async fetchConversations () {
            this.isBusy = true;
            return axios.get('/api/conversations').then((res) => {
                this.conversations = res.data.conversations;
                this.filteredConversations = this.conversations;
            }).finally(() => {
                this.isBusy = false;
            });
        },
        selectConversation (conversation, toggleSection = false) {
            this.$emit('select-conversation', conversation);
            this.selectedConversation = conversation;
            if (conversation.id !== parseInt(this.$route.params.id)) {
                this.$router.push({ name: 'Conversation', params: { id: conversation.id } });
            }
            if (toggleSection) {
                this.$emit('toggle-section');
            }
        },
        filtered () {
            if (this.search) {
                this.filteredConversations = this.conversations.filter(c => {
                    return (this.authUser.id === c.requester.id ? c.user.username : c.requester.username).includes(this.search);
                });
            } else {
                this.filteredConversations = this.conversations;
            }
        }
    }
};
</script>

<style scoped>

</style>