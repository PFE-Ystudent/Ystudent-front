<template>
    <div>
        Dashboard

        <button @click="logout">logout</button>
    </div>
</template>

<script>
import axios from '../../axios';
import store from '../../store';

export default {
    name: 'DashboardView',
    components: {
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
