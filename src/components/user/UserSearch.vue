<template>
    <div class="w-full">
        <card class="w-full flex justify-center p-4">
            <div class="w-2/3">
                <user-select-input v-model="selectedUser"
                                   :options="users"
                                   :is-busy="isBusy"
                                   no-margin
                                   debounce="400"
                                   @select-change="selectChange"
                                   @select="select" />
            </div>
        </card>
        <div v-if="selectedUser || user"
             class="mt-4">
            <UserProfile v-if="user"
                         :user="user" />
            <UserProfileLoader v-else />
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import UserProfile from './UserProfile.vue';
import UserProfileLoader from '../loaders/UserProfileLoader.vue';

export default {
    name: 'UserSearch',
    components: {
        UserProfile,
        UserProfileLoader
    },
    data () {
        return {
            selectedUser: null,
            user: null,
            isBusy: false,
            userIsBusy: false,
            users: []
        };
    },
    methods: {
        selectChange (query) {
            if (query) {
                this.isBusy = true;
                axios.get(`/api/search/users?query=${query}`).then((res) => {
                    this.isBusy = false;
                    this.users = res.data;
                });
            }
        },
        select () {
            this.user = null;
            axios.get(`/api/users/${this.selectedUser[0].id}`).then((res) => {
                    this.user = res.data;
                });
        }
    }
};
</script>

<style scoped>

</style>