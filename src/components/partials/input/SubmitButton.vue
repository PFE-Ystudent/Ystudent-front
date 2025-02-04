<template>
    <button :disabled="disabled || isBusy"
        :class="[{
            'hover:border-sky-600 hover:bg-sky-500': !disabled,
            'bg-zinc-200 border-zinc-300': disabled
        }, icon && !$slots.default ? 'p-1' : 'px-2 py-px']"
        class="text-white font-bold rounded bg-primary border-2 border-primary shadow flex gap-2 items-center justify-center">
        <div v-if="isBusy" class="animate-spin w-3.5 h-3.5 rounded-full border-4 border-b-sky-200 border-t-sky-200 border-l-sky-200 border-r-white"></div>
        <font-awesome-icon v-if="icon && !isBusy" :icon="`fa-solid ${icon}`" />
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
        },
        isBusy: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped>
.shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>