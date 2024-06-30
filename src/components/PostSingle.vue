<template>
    <div class="w-full relative rounded-md border border-zinc-300 bg-zinc-50 p-4" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div class="flex gap-2 items-center">
            <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
            <div>
                <div>{{ post.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
        <div class="text-xl font-semibold my-2">{{ post.title }}</div>
        <div class="whitespace-pre-line">{{ post.content }}</div>
        <hr class="mx-20 my-4">
        <div class="flex justify-end">
            <div class="w-3/5 flex justify-center">
                <div class="text-sky-400 flex gap-2 items-center">
                    <div class="font-semibold mb-1">{{ post.replyCount ?? 0 }}</div>
                    <font-awesome-icon icon="fa-solid fa-reply" />
                </div>
            </div>
            <div class="w-1/5 flex justify-end">
                <CancelButton @click="$router.push({ name: 'PostDetails', params: { id: post.id } })">
                    <div class="flex gap-4 items-center">
                        <div class="mb-px">Voir</div>
                        <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
                    </div>
                </CancelButton>
            </div>
        </div>
        <div v-if="isHover || showAction" class="absolute top-0 right-0 text-sky-400 cursor-pointer" v-click-outside="() => { showAction ? showAction = false : null}">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="p-4" @click="showAction = true" />
            <div v-if="showAction" class="absolute bg-white rounded-md text-black top-full right-2">
                <div class="card w-full divide-y divide-y-zinc-300 border border-zinc-300 rounded-md">
                    <template v-if="post.author.id === user.id">
                        <button class="w-full px-2 py-1" @click="() => {}">Modifier</button>
                        <button class="w-full px-2 py-1" @click="() => {}">Supprimer</button>
                    </template>
                    <template v-else>
                        <button class="w-full px-2 py-1" @click="() => {}">Signaler</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CancelButton from './CancelButton.vue';
import store from '@/store';


export default {
    name: "PostSingle",
    components: {
        CancelButton
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            user: store.state.auth.user,
            isHover: false,
            showAction: false
        }
    }
}
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
