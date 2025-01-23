<template>
    <BaseAuth>
        <div class="flex gap-4 mt-8">
            <div class="w-80">
                <ConversationsSection @selectConversation="selectConversation" />
            </div>
            <div class="w-full">
                <MessagesSection v-if="selectedConversation" :conversation="selectedConversation" />
            </div>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from '@/views/base/BaseAuth.vue';
import store from '@/store';
import ConversationsSection from '@/components/conversation/ConversationsSection.vue';
import MessagesSection from '@/components/conversation/MessagesSection.vue';

export default {
    name: 'RelationView',
    components: {
        BaseAuth,
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
    },
}
</script>

<style></style>
