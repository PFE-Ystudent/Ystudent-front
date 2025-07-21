<template>
    <div class="rounded-md border"
         :class="isSelected ? 'border-selected bg-selected' : 'border-secondary bg-secondary'">
        <slot />
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
};
</script>

<style scoped>

</style>