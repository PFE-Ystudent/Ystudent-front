<template>
    <div class="w-full flex justify-center bg-color border-y border-secondary relative gap-px"
         :class="{ 'flex-col': number === 4 }">
        <template v-if="number === 1 || (number <= 3 && isDesktop)">
            <div v-for="(file, i) in files"
                 :key="i">
                <img :src="file.url"
                     class="max-h-80 hover:scale-[101%] cursor-pointer"
                     :class="{ 'max-w-full': number === 1, 'max-w-1/2': number === 2, 'max-w-1/3': number === 3 }">
            </div>
        </template>
        <template v-else-if="number === 4 && isDesktop">
            <div class="flex justify-center items-center gap-px">
                <img :src="files[0].url"
                     class="max-h-52 max-w-1/2 hover:scale-[101%] cursor-pointer">
                <img :src="files[1].url"
                     class="max-h-52 max-w-1/2 hover:scale-[101%] cursor-pointer">
            </div>
            <div class="flex justify-center items-center gap-px">
                <img :src="files[2].url"
                     class="max-h-52 max-w-1/2 hover:scale-[101%] cursor-pointer">
                <img :src="files[3].url"
                     class="max-h-52 max-w-1/2 hover:scale-[101%] cursor-pointer">
            </div>
        </template>
        <template v-else>
            <button class="absolute left-4 w-8 text-white h-8 flex items-center justify-center top-1/2 -translate-y-1/2 rounded-full bg-zinc-500/25 hover:bg-zinc-500/50"
                    @click="slide(-1)">
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
            <img :src="files[index].url"
                 class="max-h-80 max-w-full hover:scale-[101%] cursor-pointer">
            <button class="absolute right-4 w-8 text-white h-8 flex items-center justify-center top-1/2 -translate-y-1/2 rounded-full bg-zinc-500/25 hover:bg-zinc-500/50"
                    @click="slide(1)">
                <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </button>
        </template>
    </div>
</template>

<script>
export default {
    name: 'PostFiles',
    props: {
        files: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            index: 0,
            isDesktop: window.innerWidth >= 768
        };
    },
    computed: {
        number () {
            return this.files.length;
        }
    },
    methods: {
        slide (delta) {
            this.index = (this.index + delta) % this.number;
        }
    },
};
</script>

<style lang="scss" scoped>

</style>