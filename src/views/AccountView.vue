<template>
    <BaseAuth>
        <div v-if="user" class="w-full flex justify-center mt-8 mb-32">
            <div class="w-3/5">
                <CardForm title="Mon compte">
                    <div class="flex">
                        <div class="flex flex-col gap-2 items-center justify-end w-44 mr-8">
                            <UserAvatar :avatar="previewAvatarUrl" class="w-20 h-20" customClass="shadow" />
                            <UploadInput id="avatar-upload" accept="image/*" @select-files="selectFile" />
                        </div>
                        <div class="w-full">
                            <TextInput v-model="user.username" type="text" label="Nom d'utilisateur :" :errors="errors.username" />
                            <TextInput v-model="user.email" type="text" label="Email :" disabled />
                        </div>
                    </div>
                    <TextInput v-model="user.about" type="textarea" label="A propos :" :errors="errors.about" />
                    <div class="flex justify-end mt-4">
                        <SubmitButton @click="save">
                            Enregistrer
                        </SubmitButton>
                    </div>
                </CardForm>
            </div>
        </div>
    </BaseAuth>
</template>

<script>
import TextInput from '@/components/TextInput.vue';
import BaseAuth from './BaseAuth.vue';
import CardForm from '@/components/CardForm.vue';
import axios from '@/axios';
import SubmitButton from '@/components/SubmitButton.vue';
import UploadInput from '@/components/UploadInput.vue';
import UserAvatar from '@/components/UserAvatar.vue';

export default {
    name: 'AccountView',
    components: {
        BaseAuth,
        TextInput,
        CardForm,
        SubmitButton,
        UploadInput,
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
            axios.post('/api/users/me', formData).then(() => {

                }).catch((err) => {
                    this.errors = err.response.data.errors
                });
        }
    },
}
</script>

<style scoped>
.shadow {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>