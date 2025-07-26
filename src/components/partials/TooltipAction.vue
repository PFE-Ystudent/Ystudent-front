<template>
    <div v-show="isHover || showAction"
         v-click-outside="() => { showAction ? showAction = false : null}">
        <button @click="showAction = true"
                @blur="$emit('blur')">
            <slot />
        </button>
        <div v-if="showAction"
             class="absolute bg-white rounded-md text-black top-full right-2 z-50 shadow">
            <div class="card w-full divide-y divide-y-zinc-300 border border-zinc-300 rounded-md">
                <button v-for="action in actions"
                        :key="action.value"
                        class="w-full text-nowrap px-2 py-1"
                        @click="selectAction(action.value)">
                    {{ action.label }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TooltipAction',
    props: {
        actions: {
            type: Array,
            required: true
        },
        isHover: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            showAction: false
        };
    },
    methods: {
        selectAction (value) {
            this.$emit('select-action', value);
            this.showAction = false;
        }
    }
};
</script>

<style lang="css" scoped>

</style>