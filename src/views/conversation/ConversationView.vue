<template>
    <div class="flex flex-col lg:flex-row gap-4 mt-0 lg:mt-8 -mx-4 lg:mx-0">
        <template v-if="hasConversation">
            <div v-if="showConversation || gtLg"
                 class="w-full lg:w-80">
                <ConversationsSection @select-conversation="selectConversation"
                                      @toggle-section="toggleSection"
                                      @has-conversation="hasConversation = $event" />
            </div>
            <div v-if="!showConversation || gtLg"
                 :style="`width: ${gtLg ? 'calc(100% - 320px)' : '100%'};'`">
                <MessagesSection v-if="selectedConversation"
                                 :conversation="selectedConversation"
                                 @toggle-section="toggleSection" />
            </div>
        </template>
        <div v-else
             class="w-full flex justify-center mt-8">
            <div class="w-2/3">
                <div class="w-full text-center text-xl text-muted font-semibold">
                    Vous n'avez pas encore commencé de conversation
                </div>
                <div class="mt-4 text-muted w-full text-center ">
                    Vous pouvez en créer depuis vos contact ou depuis les posts
                </div>
                <div class="w-full flex justify-center gap-6 mt-8">
                    <submit-button icon="fa-message"
                                   @click="$router.push({ name: 'Post' })">
                        Allez aux posts
                    </submit-button>
                    <submit-button icon="fa-user-group"
                                   @click="$router.push({ name: 'Relation' })">
                        Allez aux contacts
                    </submit-button>
                </div>
            </div>
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
            hasConversation: true,
            gtLg: window.innerWidth >= 1024,
            showConversation: window.innerWidth < 1024,
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
