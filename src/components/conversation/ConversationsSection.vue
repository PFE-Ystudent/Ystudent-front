<template>
    <div class="w-full">
        <div class="mb-2">
            <text-input v-model="search" placeholder="Recherche" clearable no-margin @input="filtered" />
        </div>
        <div class="w-full flex flex-col gap-2 overflow-scroll" style="height: 80vh;">
            <ConversationSingle v-for="conversation in filteredConversations"
                                :key="conversation.id"
                                :conversation="conversation"
                                :isSelected="selectedConversationId === conversation.id"
                                @click="selectConversation(conversation.id)" />
        </div>
    </div>
</template>

<script>
import ConversationSingle from '@/components/conversation/ConversationSingle.vue';
import axios from '@/axios';
import store from '@/store';

export default {
    name: 'ConversationsSection',
    components: {
        ConversationSingle
    },
    data() {
        return {
            authUser: store.state.auth.user,
            conversations: [],
            filteredConversations: [],
            selectedConversationId: null,
            search: null,
            isBusy: false,
        }
    },
    mounted () {
        this.selectedConversationId = parseInt(this.$route.params.id)
        this.fetchConversations()
    },
    methods: {
        fetchConversations () {
            this.isBusy = true
            axios.get('/api/conversations').then((res) => {
                this.conversations = res.data.conversations;
                this.filteredConversations = this.conversations;
            }).finally(() => {
                this.isBusy = false
            })
        },
        selectConversation(conversationId) {
            this.selectedConversationId = conversationId
            this.$router.push({ name: 'Conversation', params: { id: conversationId } })
        },
        filtered () {
            if (this.search) {
                this.filteredConversations = this.conversations.filter(c => {
                    return (this.authUser.id === c.requester.id ? c.user.username : c.requester.username).includes(this.search)
                })
            } else {
                this.filteredConversations = this.conversations
            }
        }
    }
}
</script>

<style scoped>

</style>