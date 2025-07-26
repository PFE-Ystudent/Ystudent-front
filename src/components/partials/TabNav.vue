<template>
    <div class="bg-color text-color flex w-full divide-x-secondary divide-x text-sm md:text-lg cursor-pointer font-semibold text-center border-t border-x border-t-secondary border-x-secondary rounded-t-md">
        <button v-for="tab in tabs"
                :key="tab.value"
                :ref="`tab-container-${tab.value}`"
                class="w-full border-b border-secondary"
                :class="{'text-primary': tab.value === selectedTab, 'max-w-min': tab.icon && !tab.name }"
                role="navigation"
                :aria-current="tab.value === selectedTab ? 'true' : 'false'"
                @click="select(tab)">
            <div class="p-2 hover:text-primary select-none"
                 :style="tab.iconColor ? `color: ${tab.iconColor};` : ''">
                <font-awesome-icon v-if="tab.icon"
                                   :icon="`fa-solid ${tab.icon}`"
                                   :class="{ 'mr-2': tab.name }" />
                {{ tab.name }}
            </div>
            <div v-if="tab.value === tabs[0].value"
                 class="h-1 bg-primary ease-in duration-200"
                 :style="`transform: translate(${translateX}px, 1px); width: ${tabWidth}px`" />
        </button>
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
            required: false,
            default: null
        }
    },
    data () {
        return {
            selectedTab: null,
            tabWidth: 0
        };
    },
    computed: {
        translateX () {
            const selectedIndex = this.tabs.findIndex(t => t.value === this.selectedTab);
            return this.tabs.slice(0, selectedIndex !== -1 ? selectedIndex : 0).reduce(
                (acc, curr) => acc + this.$refs[`tab-container-${curr.value}`][0].getBoundingClientRect().width, selectedIndex ? 1 : 0);
        }
    },
    mounted () {
        this.selectedTab = this.defaultTab || this.tabs[0].value;
        this.tabWidth = this.$refs[`tab-container-${this.selectedTab}`][0].clientWidth;
    },
    methods: {
        select (tab) {
            if (this.selectedTab !== tab.value) {
                this.selectedTab = tab.value;
                this.tabWidth = this.$refs[`tab-container-${this.selectedTab}`][0].clientWidth;
                this.$emit('select', this.selectedTab);
            }
        }
    }
};
</script>