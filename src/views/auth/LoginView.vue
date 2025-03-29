<template>
    <div class="flex justify-center">
        <div class="w-1/3">
            <CardForm title="Connexion">
                <div class="flex flex-col items-center"
                     @keypress.enter="login">
                    <text-input v-model="email"
                                label="Email :"
                                type="email"
                                :errors="errors.email" />
                    <text-input v-model="password"
                                label="Mot de passe :"
                                type="password"
                                :errors="errors.password" />
                    <div class="mb-2 mt-4">
                        <submit-button :is-busy="isBusy"
                                       @click="login">
                            Se connecter
                        </submit-button>
                    </div>
                </div>
            </CardForm>
            <div class="w-full text-center text-muted mt-1">
                Vous n'avez pas encore de compte ? <a class="text-sky-300 hover:text-sky-400 underline font-semibold"
                                                      href="/register">inscrivez-vous ici</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import store from '@/store';
import CardForm from '@/components/container/CardForm.vue';

export default {
    name: 'LoginView',
    components: {
        CardForm
    },
    data () {
        return {
            email: '',
            password: '',
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
        login () {
            this.isBusy = true;
            axios.post('/api/login', {
                email: this.email,
                password: this.password
            }).then(res => {
                    store.commit('login', res.data.token);
                    store.commit('setUser', res.data.user);
                    if (this.$router.currentRoute.value.query.redirect) {
                        this.$router.push({ path: this.$router.currentRoute.value.query.redirect });
                        return;
                    }
                    this.$router.push({ name: 'Dashboard' });
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                }).finally(() => {
                    this.isBusy = false;
                });
        }
    }
};
</script>
