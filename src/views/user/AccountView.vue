<template>
    <div v-if="user" class="w-full flex justify-end mt-8 mb-32 gap-4">
        <div class="w-3/5">
            <CardForm title="Mon compte">
                <div class="flex">
                    <div class="flex flex-col gap-2 items-center justify-end w-44 mr-8">
                        <UserAvatar :avatar="previewAvatarUrl" class="w-20 h-20" customClass="shadow" />
                        <upload-input id="avatar-upload" accept="image/*" @select-files="selectFile" />
                    </div>
                    <div class="w-full">
                        <text-input v-model="user.username" type="text" label="Nom d'utilisateur :" :errors="errors.username" />
                        <text-input v-model="user.email" type="text" label="Email :" disabled />
                    </div>
                </div>
                <text-input v-model="user.about" type="textarea" label="A propos :" :errors="errors.about" />
                <div class="flex justify-end mt-4">
                    <submit-button @click="save">
                        Enregistrer
                    </submit-button>
                </div>
            </CardForm>
        </div>
        <div class="w-1/5">
            <submit-button @click="switchTheme">
                <template v-if="theme === 'dark'">
                    <font-awesome-icon icon="fa-solid fa-moon" />
                    Thème sombre
                </template>
                <template v-else>
                    <font-awesome-icon icon="fa-solid fa-sun" />
                    Thème claire
                </template>
            </submit-button>
        </div>
    </div>
</template>

<script>
import CardForm from '@/components/container/CardForm.vue';
import axios from '@/axios';
import store from '@/store';
import UserAvatar from '@/components/user/UserAvatar.vue';
import { mapState } from 'vuex';

export default {
    name: 'AccountView',
    components: {
        CardForm,
        UserAvatar
    },
    data() {
        return {
            user: null,
            previewAvatarUrl: null,
            avatar: null,
            errors: {}
        }
    },
    computed: {
        ...mapState({
            theme: state => state.parameter.theme
        })
    },
    mounted () {
        axios.get('/api/users/me').then(res => {
                    this.user = res.data;
                    this.previewAvatarUrl = res.data.avatar;
                }).catch(() => {
                    // TODO: gérer l'erreur
                })
    },
    beforeDestroy() {
        if (this.previewAvatarUrl) {
            URL.revokeObjectURL(this.previewAvatarUrl);
        }
    },
    methods: {
        selectFile (files) {
            this.previewAvatarUrl = null;
            if (files.length) {
                this.previewAvatarUrl = URL.createObjectURL(files[0]);
                this.avatar = files[0];
            }
        },
        save () {
            const formData = new FormData();
            formData.append('username', this.user.username);
            formData.append('about', this.user.about ? this.user.about : '');
            if (this.avatar) {
                formData.append('avatar', this.avatar);
            }
            axios.post('/api/users/me', formData).then((res) => {
                    this.user = res.data;
                    this.previewAvatarUrl = res.data.avatar;
                }).catch((err) => {
                    this.errors = err.response.data.errors
                });
        },
        switchTheme () {
            store.commit('switchTheme')
        }
    },
}
</script>

<style scoped>
.shadow {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>