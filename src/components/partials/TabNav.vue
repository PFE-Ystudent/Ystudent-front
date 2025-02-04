<template>
    <div class="bg-white flex w-full divide-x-zinc-300 divide-x text-lg cursor-pointer font-semibold text-center border-t border-x border-t-zinc-300 border-x-zinc-300 rounded-t-md">
        <div v-for="tab in tabs"
            :key="tab.value"
            class="w-full border-b border-zinc-300" :class="{'text-primary': tab.value === selectedTab}"
            @click="select(tab)">
            <div class="p-2 hover:text-primary select-none">
                {{ tab.name }}
            </div>
            <div v-if="tab.value === tabs[0].value" class="w-full h-1 bg-primary ease-in duration-200" :style="`transform: translate(${this.selectedIndex}00%, 1px)`"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabNav',
    props: {
        tabs: {
            type: Array,
            required: true
        },
        defaultTab: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            selectedTab: null,
            selectedIndex: null,
        }
    },
    mounted() {
        this.selectedTab = this.defaultTab || this.tabs[0].value
        this.selectedIndex = this.tabs.findIndex(t => t.value === this.selectedTab)
    },
    methods: {
        select(tab) {
            if (this.selectedTab !== tab.value) {
                this.selectedTab = tab.value
                this.selectedIndex = this.tabs.findIndex(t => t.value === this.selectedTab)
                this.$emit('select', this.selectedTab)
            }
        }
    }
}
</script>