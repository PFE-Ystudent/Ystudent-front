<template>
    <div>
        <router-link :to="'/'">Dashboard</router-link>
        <h1>login</h1>
        <div>
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <button @click="login">Se connecter</button>
        </div>
    </div>
</template>

<script>
import axios from '../../axios';
import store from '../../store';

export default {
    name: "LoginView",
    data() {
        return {
            email: '',
            password: '',
        }
    },
    mounted () {
        if (store.state.auth.token) {
            this.$router.push({ name: 'Dashboard' });
        }
    },
    methods: {
        login() {
            axios.post('/api/login', {
                email: this.email,
                password: this.password
            }).then(res => {
                    store.commit('login', res.data.token);
                    this.$router.push({ name: 'Dashboard' });
                })
                .catch(err => console.log(err));
        }
    }
}
</script>