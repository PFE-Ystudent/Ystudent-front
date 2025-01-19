<template>
    <div class="rounded-md border" :class="isSelected ? 'border-sky-500 bg-sky-50' : 'border-zinc-300 bg-zinc-50'">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CardComponent',
    props: {
        isSelected: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    
</style>