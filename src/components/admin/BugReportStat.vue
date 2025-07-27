<template>
    <div class="flex flex-col items-center">
        <div v-if="stat"
             class="text-primary">
            {{ stat }}
        </div>
        <ContentLoader v-else
                       width="24"
                       height="24"
                       primary-color="var(--loader-primary)"
                       secondary-color="var(--loader-secondary)"
                       :speed="0.8">
            <rect x="0"
                  y="4"
                  width="24"
                  height="16" />
        </ContentLoader>
        <div class="text-xs text-muted">
            {{ name }}
        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'BugReportStat',
    components: {
        ContentLoader,
    },
    props: {
        name: {
            type: String,
            required: true
        },
        stat: {
            type: [Number, String],
            default: null
        }
    }
};
</script>
