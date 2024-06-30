<template>
    <div class="w-full rounded-md border border-zinc-300 p-4">
        <div class="flex gap-2 items-center">
            <div class="w-8 h-8 bg-zinc-300 rounded-full"></div>
            <div>
                <div>{{ post.author.username }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
        <div class="text-xl font-semibold my-2">{{ post.title }}</div>
        <div>{{ post.content }}</div>
    </div>
</template>

<script>

export default {
    name: "PostSingle",
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>
