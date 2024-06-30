<template>
    <div class="w-full rounded-md border border-zinc-300 bg-zinc-50 p-4">
        <div class="flex gap-2 items-center">
            <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
            <div>
                <div>{{ postReply.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
        <div class="whitespace-pre-line mt-2">{{ postReply.content }}</div>
    </div>
</template>

<script>

export default {
    name: "PostReplySingle",
    props: {
        postReply: {
            type: Object,
            required: true
        }
    }
}
</script>
