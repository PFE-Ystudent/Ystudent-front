<template>
    <div class="w-full bg-sky-50 border border-sky-400 rounded-md shadow px-2 pb-2 cursor-auto">
        <div class="flex pl-8" style="background: linear-gradient(to bottom, transparent 60%, white 40%);">
            <UserAvatar class="w-32 h-32" :avatar="user.avatar" customClass="border-8 border-sky-50" />
            <div class="flex items-end pl-4 w-1/2">
                <div class="w-full h-2/5 flex justify-between">
                    <div>
                        <div class="text-xl font-semibold">{{ user.username }}</div>
                        <div class="text-xs text-zinc-400">Membre</div>
                    </div>
                    <div class="h-full flex items-center">
                        <div class="flex gap-4 py-4 text-sky-400">
                            <div class="flex items-center font-semibold gap-2 hover:text-sky-500 cursor-pointer">
                                <div class="text-lg">{{ user.postsCount }}</div>
                                <font-awesome-icon icon="fa-solid fa-message" />
                            </div>
                            <div class="flex items-center font-semibold gap-2 hover:text-sky-500 cursor-pointer">
                                <div class="text-lg">{{ user.postRepliesCount }}</div>
                                <font-awesome-icon icon="fa-solid fa-reply" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-b-md p-2">
            <div>{{ user.about }}</div>
            <div class="text-end text-xs text-zinc-400">
                Actif depuis le {{ createdAt }}
            </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from './UserAvatar.vue';

export default {
    name: 'UserProfile',
    components: {
        UserAvatar,
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    computed: {
        createdAt () {
            return new Date(this.user.createdAt).toLocaleString('fr', { hour12: false, dateStyle: "short" }) 
        }
    },
}
</script>

<style scoped>
    
</style>