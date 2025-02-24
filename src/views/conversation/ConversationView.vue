<template>
    <div class="flex gap-4 mt-8">
        <div class="w-80">
            <ConversationsSection @selectConversation="selectConversation" />
        </div>
        <div style="width: calc(100% - 320px)">
            <MessagesSection v-if="selectedConversation" :conversation="selectedConversation" />
        </div>
    </div>
</template>

<script>
import store from '@/store';
import ConversationsSection from '@/components/conversation/ConversationsSection.vue';
import MessagesSection from '@/components/conversation/MessagesSection.vue';

export default {
    name: 'RelationView',
    components: {
        ConversationsSection,
        MessagesSection
    },
    data () {
        return {
            authUser: store.state.auth.user,
            selectedConversation: null
        }
    },
    methods: {
        selectConversation (conversation) {
            this.selectedConversation = conversation
        }
    }
}
</script>

<style></style>
