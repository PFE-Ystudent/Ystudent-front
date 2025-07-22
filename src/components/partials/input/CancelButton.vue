<template>
    <button :disabled="disabled"
            :class="[{'hover:border-sky-500 hover:text-sky-500': !disabled}, icon && !$slots.default ? 'p-1.5 ratio' : 'px-2 py-px']"
            class="text-sky-400 font-bold rounded bg-body border-2 border-sky-400 shadow disabled:text-zinc-300 disabled:border-zinc-300 flex gap-2 items-center justify-center">
        <font-awesome-icon v-if="icon"
                           :icon="`fa-solid ${icon}`" />
        <slot />
    </button>
</template>

<script>
export default {
    name: 'CancelButton',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: null
        }
    }
};
</script>

<style scoped>
.shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.ratio {
    aspect-ratio: 1;
}
</style>