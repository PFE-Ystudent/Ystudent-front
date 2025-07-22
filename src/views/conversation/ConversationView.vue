<template>
    <div class="flex flex-col md:flex-row gap-4 mt-8">
        <div class="w-full lg:w-80 hidden lg:block">
            <ConversationsSection @select-conversation="selectConversation" />
        </div>
        <div :style="`width: ${gtLg ? 'calc(100% - 320px)' : '100%'};'`">
            <MessagesSection v-if="selectedConversation"
                             :conversation="selectedConversation" />
        </div>
    </div>
</template>

<script>
import store from '@/store';
import ConversationsSection from '@/components/conversation/ConversationsSection.vue';
import MessagesSection from '@/components/conversation/MessagesSection.vue';

export default {
    name: 'ConversationView',
    components: {
        ConversationsSection,
        MessagesSection
    },
    data () {
        return {
            authUser: store.state.auth.user,
            selectedConversation: null,
            gtLg: window.innerWidth >= 1024,
        };
    },
    methods: {
        selectConversation (conversation) {
            this.selectedConversation = conversation;
        }
    }
};
</script>

<style></style>
