<template>
    <div class="w-full flex justify-center">
        <card class="w-full flex justify-center p-4">
            <div class="w-2/3">
                <user-select-input v-model="selectedUser" :options="users" :isBusy="isBusy" noMargin debounce="400" @select-change="selectChange" />
            </div>
        </card>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    name: 'UserSearch',
    data() {
        return {
            selectedUser: null,
            isBusy: false,
            users: []
        }
    },
    methods: {
        selectChange (query) {
            if (query) {
                this.isBusy = true;
                axios.get(`/api/search/users?query=${query}`).then((res) => {
                    this.isBusy = false;
                    this.users = res.data;
                })
            }
        }
    }
}
</script>

<style scoped>

</style>