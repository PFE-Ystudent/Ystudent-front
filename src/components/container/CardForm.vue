<template>
    <div class="card w-full px-4 py-2 text-color bg-secondary border-y border-l-4 border-r border-y-secondary border-r-secondary border-l-primary rounded-md">
        <div v-if="title"
             class="title text-primary text-2xl font-semibold mb-2">
            {{ title }}
        </div>
        <slot />
    </div>
</template>

<script>

export default {
    name: 'CardForm',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.title {
    font-weight: 700;
    letter-spacing: 0.8px;
}
</style>