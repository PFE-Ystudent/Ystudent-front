<template>
    <card class="w-full flex items-center p-2 gap-2 cursor-pointer">
        <ContentLoader width="32" height="32" primaryColor="var(--loader-primary)" secondaryColor="var(--loader-secondary)" :speed="0.8">
            <circle cx="16" cy="16" r="16" />
        </ContentLoader>
        <div style="width: calc(100% - 40px);">
            <ContentLoader width="150" height="36" primaryColor="var(--loader-primary)" secondaryColor="var(--loader-secondary)" :speed="0.8">
                <rect x="0" y="8" rx="3" ry="3" width="100" height="12" />
                <rect x="0" y="24" rx="3" ry="3" width="75" height="8" />
            </ContentLoader>
        </div>
    </card>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'ConversationSingleLoader',
    components: {
        ContentLoader,
    }
}
</script>

<style scoped>

</style>