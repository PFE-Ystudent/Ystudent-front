<template>
    <BaseAuth>
        <div class="flex gap-4 mt-8">
            <div class="w-1/2">
                <div class="mt-4 mb-32">
                    <div class="sticky top-[62px]" style="z-index: 1;">
                        <div class="bg-white pt-4">
                            <TabNav :tabs="tabs" :default-tab="activeTab" @select="setTab" />
                        </div>
                    </div>
                    <div class="mt-4 flex flex-col gap-4">
                        <template v-if="activeTab !== 'search'">
                            <template v-if="!isBusy">
                                <UserProfile v-for="user in users" :user="user" :key="user.id" :actionType="activeTab">
                                    <template v-if="this.activeTab === 'request'">
                                        <cancel-button @click="replyRequest(user.id, false)">
                                            <font-awesome-icon icon="fa-solid fa-xmark" />
                                            Refuser
                                        </cancel-button>
                                        <submit-button @click="replyRequest(user.id, true)">
                                            <font-awesome-icon icon="fa-solid fa-user-group" />
                                            Accepter
                                        </submit-button>
                                    </template>
                                </UserProfile>
                            </template>
                            <template v-else>
                                <UserProfileLoader v-for="i in 3" :key="i" />
                            </template>
                        </template>
                        <template v-else>
                            <UserSearch />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from '@/views/base/BaseAuth.vue';
import store from '@/store';
import TabNav from '@/components/partials/TabNav.vue';
import axios from '@/axios';
import UserProfile from '@/components/user/UserProfile.vue';
import UserProfileLoader from '@/components/loaders/UserProfileLoader.vue';
import UserSearch from '@/components/user/UserSearch.vue';

export default {
    name: 'RelationView',
    components: {
        BaseAuth,
        TabNav,
        UserSearch,
        UserProfile,
        UserProfileLoader
    },
    data () {
        return {
            authUser: store.state.auth.user,
            users: [],
            isBusy: false,
            activeTab: null,
            tabs: [
                {name: "Contacts", value: "contact"},
                {name: "Recherche", value: "search"},
                {name: "Demandes", value: "request"},
                {name: "Masqués", value: "blocked"},
            ]
        }
    },
    created () {
        this.setTab(this.tabs[0].value);
    },
    methods: {
        setTab (newTab) {
            this.activeTab = newTab;
            this.users = [];
            if (this.activeTab !== 'search') {
                this.fetchRelations();
            }
        },
        fetchRelations () {
            this.isBusy = true
            axios.get(`/api/users/relations/${this.activeTab}`).then((res) => {
                this.users = res.data;
            }).finally(() => {
                this.isBusy = false
            })
        },
        replyRequest (userId, isAccepted) {
            axios.post(`/api/users/${userId}/relations/request/reply`, { is_accepted: isAccepted }).then(() => {
                    this.users = this.users.filter(u => u.id !== userId)
                })
        }
    },
}
</script>

<style></style>
