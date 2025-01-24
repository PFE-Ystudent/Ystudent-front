<template>
    <div class="w-full flex" :class="isCurrentUser ? 'justify-end' : 'justify-start'">
        <div class="flex w-4/5 gap-2" :class="{ 'flex-row-reverse': isCurrentUser }">
            <ContentLoader v-if="withAvatar" width="48" height="48" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                <circle cx="24" cy="24" r="24" />
            </ContentLoader>
            <div v-else class="w-12 h-12"></div>
            <div class="relative min-w-36" style="max-width: calc(100% - 56px)">
                <div class="p-2 mt-2 rounded-b-md border" :class="isCurrentUser ? 'bg-secondary border-secondary text-black rounded-tl-md' : 'bg-primary border-primary text-white rounded-tr-md'">
                    <div class="outline-none whitespace-pre-wrap">
                        <ContentLoader width="256" height="24" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                            <rect x="0" y="0" rx="3" ry="3" width="228" height="16" />
                        </ContentLoader>
                    </div>
                    <div class="text-[10px] w-full mt-1 flex" :class="isCurrentUser ? 'text-black justify-start' : 'text-white justify-end'">
                        <ContentLoader width="64" height="12" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                            <rect x="0" y="6" rx="3" ry="3" width="64" height="6" />
                        </ContentLoader>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'MessageSingleLoader',
    components: {
        ContentLoader
    },
    props: {
        withAvatar: {
            type: Boolean,
            default: true
        },
        isCurrentUser: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped>

</style>