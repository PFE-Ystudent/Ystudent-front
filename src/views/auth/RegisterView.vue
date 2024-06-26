<template>
    <BaseUnAuth>
        <div class="flex justify-center">
            <div class="w-1/3">
                <CardForm title="Inscription">
                    <div class="flex flex-col gap-2 items-center" @keypress.enter="login">
                        <TextInput label="Nom d'utilisateur :" :default-value="username" @update="(val) => username = val" :errors="errors.username" />
                        <TextInput label="Email :" type="email" :default-value="email" @update="(val) => email = val" :errors="errors.email" />
                        <TextInput label="Mot de passe :" type="password" :default-value="password" @update="(val) => password = val" :errors="errors.password" />
                        <TextInput label="Confirmer le mot de passe :" type="password" :default-value="password_confirmation" @update="(val) => password_confirmation = val" :errors="errors.password_confirmation" />
                        <div class="mb-2 mt-4">
                            <SubmitButton @click="register">S'inscrire</SubmitButton>
                        </div>
                    </div>
                </CardForm>
                <div class="w-full text-center text-zinc-500 mt-1">
                    Vous avez déjà un compte ? <a class="text-sky-300 hover:text-sky-400 underline font-semibold" href="/login">connectez-vous ici</a>
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
    name: "RegisterView",
    components: {
        BaseUnAuth,
        TextInput,
        CardForm,
        SubmitButton
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {
                username: null,
                email: null,
                password: null,
                password_confirmation: null,
            }
        }
    },
    mounted () {
        if (store.state.auth.token) {
            this.$router.push({ name: 'Dashboard' });
        }
    },
    methods: {
        register() {
            axios.post('/api/register', {
                email: this.email,
                username: this.username,
                password: this.password,
                password_confirmation: this.password_confirmation
            }).then(res => {
                    store.commit('login', res.data.token);
                    store.commit('setUser', res.data.user);
                    this.$router.push({ name: 'Dashboard' });
                })
                .catch(err => {
                    this.errors = err.response.data.errors ?? {}
                });
        }
    }
}
</script>
