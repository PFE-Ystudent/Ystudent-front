<template>
    <BaseUnAuth>
        <div class="flex justify-center">
            <div class="w-1/3">
                <CardForm title="Connexion">
                    <div class="flex flex-col items-center" @keypress.enter="login">
                        <text-input v-model="email" label="Email :" type="email" :errors="errors.email" />
                        <text-input v-model="password" label="Mot de passe :" type="password" :errors="errors.password" />
                        <div class="mb-2 mt-4">
                            <submit-button @click="login">Se connecter</submit-button>
                        </div>
                    </div>
                </CardForm>
                <div class="w-full text-center text-zinc-500 mt-1">
                    Vous n'avez pas encore de compte ? <a class="text-sky-300 hover:text-sky-400 underline font-semibold" href="/register">inscrivez-vous ici</a>
                </div>
            </div>
        </div>
    </BaseUnAuth>
</template>

<script>
import axios from '@/axios';
import store from '@/store';
import BaseUnAuth from '@/views/base/BaseUnAuth.vue';
import CardForm from '@/components/container/CardForm.vue';

export default {
    name: "LoginView",
    components: {
        BaseUnAuth,
        CardForm
    },
    data() {
        return {
            email: '',
            password: '',
            errors: {}
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
                    store.commit('setUser', res.data.user);
                    this.$router.push({ name: 'Dashboard' });
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                });
        }
    }
}
</script>
