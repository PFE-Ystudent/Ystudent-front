<template>
    <div class="flex flex-col lg:flex-row gap-4 mt-0 lg:mt-8 -mx-4 lg:mx-0">
        <div v-if="showConversation || gtLg"
             class="w-full lg:w-80">
            <ConversationsSection @select-conversation="selectConversation"
                                  @toggle-section="toggleSection" />
        </div>
        <div v-if="!showConversation || gtLg"
             :style="`width: ${gtLg ? 'calc(100% - 320px)' : '100%'};'`">
            <MessagesSection v-if="selectedConversation"
                             :conversation="selectedConversation"
                             @toggle-section="toggleSection" />
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
            showConversation: window.innerWidth < 1024
        };
    },
    methods: {
        selectConversation (conversation) {
            this.selectedConversation = conversation;
        },
        toggleSection () {
            if (!this.gtLg) {
                this.showConversation = !this.showConversation;
            }
        }
    }
};
</script>

<style></style>
