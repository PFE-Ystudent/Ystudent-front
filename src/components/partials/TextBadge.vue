<template>
    <div class="text-[13px] flex flex-row items-center justify-center px-2 gap-2 text-nowrap rounded-lg font-semibold select-none"
         :style="`color: ${color}; background-color: ${color}10; border: 1px solid ${color}16;`">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TextBadge',
    props: {
        color: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>

</style>