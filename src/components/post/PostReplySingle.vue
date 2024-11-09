<template>
    <card class="w-full p-4">
        <div class="flex gap-2 items-center">
            <UserAvatar class="w-8 h-8" :avatar="postReply.author.avatar" />
            <div>
                <div>{{ postReply.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
        <div class="whitespace-pre-line mt-2">{{ postReply.content }}</div>
    </card>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';


export default {
    name: "PostReplySingle",
    components: {
        UserAvatar,
    },
    props: {
        postReply: {
            type: Object,
            required: true
        }
    }
}
</script>
