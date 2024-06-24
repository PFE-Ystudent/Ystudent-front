<template>
    <BaseAuth>
        <div>
            Dashboard
    
            <button @click="logout">logout</button>
        </div>
    </BaseAuth>
</template>

<script>
import axios from '../../axios';
import store from '../../store';
import BaseAuth from '../BaseAuth.vue';

export default {
    name: 'DashboardView',
    components: {
        BaseAuth
    },
    methods: {
        logout () {
            axios.delete('/api/logout').then(() => {
                    store.commit('logout');
                    this.$router.push({ name: 'Login' });
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

<style></style>
