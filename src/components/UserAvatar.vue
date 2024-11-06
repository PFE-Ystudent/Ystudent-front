<template>
    <div>
        <img v-if="avatar" :src="avatar" class="w-full h-full rounded-full border border-zinc-300" :class="customClass" />
        <div v-else class="w-full h-full bg-zinc-300 rounded-full" :class="customClass"></div>
    </div>
</template>

<script>
export default {
    name: 'UserAvatar',
    props: {
        avatar: {
            type: String,
            default: null
        },
        customClass: {
            type: String,
            default: ''
        }
    },
}
</script>

<style>

</style>