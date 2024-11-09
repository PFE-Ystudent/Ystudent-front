<template>
    <card class="w-full shadow px-2 pb-2 cursor-auto">
        <div class="flex pl-8" style="background: linear-gradient(to bottom, transparent 60%, white 40%);">
            <ContentLoader width="128" height="128" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8" class="bg-zinc-300 border-8 border-zinc-50 rounded-full">
                <circle cx="64" cy="64" r="64" />
            </ContentLoader>
            <div class="flex items-end pl-4 w-1/2">
                <div class="w-full h-2/5 flex justify-between">
                    <div>
                        <ContentLoader width="128" height="48" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                            <rect x="0" y="8" rx="3" ry="3" width="128" height="16" />
                            <rect x="0" y="32" rx="3" ry="3" width="64" height="8" />
                        </ContentLoader>
                    </div>
                    <div class="h-full flex items-center">
                        <div class="flex gap-4 py-4 text-sky-400">
                            <ContentLoader width="32" height="24" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                                <rect x="0" y="4" rx="3" ry="3" width="32" height="20" />
                            </ContentLoader>
                            <ContentLoader width="32" height="24" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                                <rect x="0" y="4" rx="3" ry="3" width="32" height="20" />
                            </ContentLoader>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-b-md p-2">
            <ContentLoader width="100%" height="64" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                <rect x="0" y="8" rx="3" ry="3" width="100%" height="12" />
                <rect x="0" y="24" rx="3" ry="3" width="100%" height="12" />
                <rect x="0" y="40" rx="3" ry="3" width="70%" height="12" />
            </ContentLoader>
            <ContentLoader width="100%" height="8" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                <rect x="calc(100% - 128px)" y="0" rx="3" ry="3" width="128" height="8" />
            </ContentLoader>
        </div>
    </card>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'UserProfileLoader',
    components: {
        ContentLoader,
    },
}
</script>

<style scoped>
    
</style>