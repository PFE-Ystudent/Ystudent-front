<template>
    <div class="mx-2 rounded flex items-center font-semibold gap-2 py-2 cursor-pointer border"
        :class="{'justify-center': !isDeploy,
            'px-5': isDeploy,
            'bg-sky-200 border-bg-sky-200 text-white': isHover && !isSelected,
            'text-sky-300 border-sky-300': !isHover,
            'bg-sky-300 border-sky-300 text-white': isSelected
        }"
        @click="$router.push({ name: route })"
        @mouseenter="isHover = true" @mouseleave="isHover = false">
        <font-awesome-icon :icon="`fa-solid ${icon}`" size="lg" />
        <span v-if="isDeploy" class="overflow-x-hidden text-nowrap leading-4">{{ name }}</span>
    </div>
</template>

<script>
export default {
    name: "SideBarItem",
    props: {
        name: {
            type: String,
            required: true
        },
        route: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        isDeploy: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            isHover: false
        }
    },
    computed: {
        isSelected () {
            return this.$route.name === this.route;
        }
    }
}
</script>
