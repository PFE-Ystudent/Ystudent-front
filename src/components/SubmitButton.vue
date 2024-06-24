<template>
    <button @click="$emit('click')" :disabled="disabled"
        :class="{'hover:border-sky-600 hover:bg-sky-500': !disabled}"
        class="text-white font-bold rounded px-2 py-px bg-sky-400 border-2 border-sky-500 shadow disabled:bg-zinc-200 disabled:border-zinc-300">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "SubmitButton",
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