<template>
    <div ref="badge"
         class="text-[13px] flex flex-row items-center justify-center px-2 gap-2 text-nowrap rounded-lg font-semibold select-none"
         :class="{'cursor-pointer': clickable }"
         :style="`color: ${color}; background-color: ${color}10; border: 1px solid ${color}16;`"
         :tabindex="clickable ? 0 : -1"
         role="button"
         @keydown.enter="enter">
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
        },
        clickable: Boolean
    },
    methods: {
        enter () {
            if (this.clickable) {
                this.$refs.badge.blur();
                this.$emit('click');
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>