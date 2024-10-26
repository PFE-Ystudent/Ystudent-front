<template>
    <BaseUnAuth>
        <div class="flex justify-center">
            <div class="w-1/3">
                <CardForm title="Connexion">
                    <div class="flex flex-col items-center" @keypress.enter="login">
                        <TextInput v-model="email" label="Email :" type="email" :errors="errors.email" />
                        <TextInput v-model="password" label="Mot de passe :" type="password" :errors="errors.password" />
                        <div class="mb-2 mt-4">
                            <SubmitButton @click="login">Se connecter</SubmitButton>
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
import axios from '../../axios';
import store from '../../store';
import BaseUnAuth from '../BaseUnAuth.vue';
import TextInput from '../../components/TextInput.vue';
import CardForm from '../../components/CardForm.vue';
import SubmitButton from '../../components/SubmitButton.vue';

export default {
    name: "LoginView",
    components: {
        BaseUnAuth,
        TextInput,
        CardForm,
        SubmitButton
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
