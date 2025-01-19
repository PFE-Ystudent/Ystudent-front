<template>
    <BaseAuth>
        <div class="flex gap-4 mt-8">
            <div class="w-80">
                <ConversationsSection />
            </div>
            <div class="w-full bg-green-200">o</div>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from '@/views/base/BaseAuth.vue';
import store from '@/store';
import ConversationsSection from '@/components/conversation/ConversationsSection.vue';

export default {
    name: 'RelationView',
    components: {
        BaseAuth,
        ConversationsSection
    },
    data () {
        return {
            authUser: store.state.auth.user
        }
    }
}
</script>

<style></style>
