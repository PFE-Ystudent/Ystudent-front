<template>
    <div class="flex justify-center">
        <div class="w-full px-4 sm:px-0 sm:w-2/3 lg:w-1/3">
            <CardForm title="Inscription">
                <div class="flex flex-col items-center"
                     @keypress.enter="login">
                    <text-input v-model="username"
                                label="Nom d'utilisateur :"
                                :errors="errors.username" />
                    <text-input v-model="email"
                                label="Email :"
                                type="email"
                                :errors="errors.email" />
                    <text-input v-model="password"
                                label="Mot de passe :"
                                type="password"
                                :errors="errors.password" />
                    <text-input v-model="password_confirmation"
                                label="Confirmer le mot de passe :"
                                type="password"
                                :errors="errors.password_confirmation" />
                    <div class="mb-2 mt-4">
                        <submit-button :is-busy="isBusy"
                                       @click="register">
                            S'inscrire
                        </submit-button>
                    </div>
                </div>
            </CardForm>
            <div class="w-full text-center text-muted mt-1">
                Vous avez déjà un compte ? <a class="text-sky-300 hover:text-sky-400 underline font-semibold"
                                              href="/login"
                                              aria-label="Accéder à la page de connexion">connectez-vous ici</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import store from '@/store';
import CardForm from '@/components/container/CardForm.vue';

export default {
    name: 'RegisterView',
    components: {
        CardForm
    },
    data () {
        return {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {},
            isBusy: false
        };
    },
    mounted () {
        if (store.state.auth.token) {
            this.$router.push({ name: 'Dashboard' });
        }
    },
    methods: {
        register () {
            this.isBusy = true;
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
                    this.errors = err.response.data.errors ?? {};
                }).finally(() => {
                    this.isBusy = false;
                });
        }
    }
};
</script>
