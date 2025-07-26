<template>
    <div class="flex flex-row items-center justify-between gap-2 px-4 py-3 text-nowrap rounded-lg font-semibold select-none w-60 text-sm"
         :style="`color: ${color}; background-color: ${color}10; border: 1px solid ${color}50;`">
        <slot />
        <button @click="$emit('close')">
            <font-awesome-icon icon="fa-solid fa-xmark"
                               size="xs" />
        </button>
    </div>
</template>

<script>
export default {
    name: 'TextToast',
    props: {
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        color () {
            if (this.type === 'sucess') {
                return '#00bc7d';
            } else if (this.type === 'error') {
                return '#FF635B';
            }
            return '#38bdf8';
        }
    },
};
</script>

<style lang="scss" scoped>

</style>