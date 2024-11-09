<template>
    <button :disabled="disabled"
        :class="{'hover:border-sky-500 hover:text-sky-500': !disabled}"
        class="text-sky-400 font-bold rounded px-2 py-px bg-white border-2 border-sky-400 shadow disabled:text-zinc-300 disabled:border-zinc-300 flex gap-2 items-center justify-center">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "CancelButton",
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>