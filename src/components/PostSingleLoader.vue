<template>
    <div class="w-full rounded-md border border-zinc-300 bg-zinc-50 p-4">
        <div class="flex gap-2 items-center">
            <ContentLoader width="32" height="32" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                <circle cx="16" cy="16" r="16" />
            </ContentLoader>

            <ContentLoader width="150" height="32" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
                <rect x="0" y="0" rx="3" ry="3" width="100" height="12" />
                <rect x="0" y="16" rx="3" ry="3" width="75" height="12" />
            </ContentLoader>
        </div>
        <ContentLoader viewBox="0 0 250 40" primaryColor="#efefef" secondaryColor="#eaeaea" :speed="0.8">
            <rect x="0" y="8" rx="3" ry="3" width="100" height="8" />
            <rect x="0" y="24" rx="3" ry="3" width="200" height="5" />
            <rect x="0" y="32" rx="3" ry="3" width="150" height="5" />
        </ContentLoader>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
    name: "PostSingleLoader",
    components: { ContentLoader }
}
</script>
