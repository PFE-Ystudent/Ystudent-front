<template>
    <router-link ref="item"
                 :to="{ name: route }"
                 class="mx-2 rounded flex items-center font-semibold gap-2 py-2 cursor-pointer border px-4"
                 :class="{
                     'bg-selected border-selected text-sky-500': isHover && !isSelected,
                     'text-sky-300 border-sky-300': !isHover && !isSelected,
                     'bg-primary border-primary text-white': isSelected
                 }"
                 tabindex="0"
                 role="button"
                 :aria-label="`Accéder à ${name}`"
                 :aria-current="isSelected ? 'true' : 'false'"
                 @click="click"
                 @keydown.enter="click"
                 @mouseenter="isHover = true"
                 @mouseleave="isHover = false">
        <font-awesome-icon :icon="`fa-solid ${icon}`"
                           size="lg" />
        <span v-if="isDeploy"
              class="overflow-hidden text-nowrap leading-4 select-none">{{ name }}</span>
    </router-link>
</template>

<script>
export default {
    name: 'SideBarItem',
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
        };
    },
    computed: {
        isSelected () {
            return this.$route.name === this.route;
        }
    },
    methods: {
        click () {
            this.$refs.item.$el.blur();
            this.$emit('selected', this.name);
        }
    },
};
</script>