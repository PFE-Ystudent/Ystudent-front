<template>
    <div>
        <img v-if="avatar"
             :src="avatar"
             class="w-full h-full rounded-full"
             :class="customClass">
        <div v-else
             class="w-full h-full bg-selected text-primary rounded-full"
             :class="customClass">
            <div class="w-full h-full rounded-full border-2 border-selected flex justify-center items-center">
                <font-awesome-icon icon="fa-solid fa-user"
                                   class="svg-shadow w-3/5 h-3/5" />
            </div>
        </div>
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
    }
};
</script>

<style scoped>
.svg-shadow {
    filter: drop-shadow(0.5px 0.5px 1px black);
}
</style>
