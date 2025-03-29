<template>
    <card class="w-full p-4">
        <div class="flex gap-2 items-center">
            <ContentLoader width="32"
                           height="32"
                           primary-color="var(--loader-primary)"
                           secondary-color="var(--loader-secondary)"
                           :speed="0.8">
                <circle cx="16"
                        cy="16"
                        r="16" />
            </ContentLoader>

            <ContentLoader width="150"
                           height="32"
                           primary-color="var(--loader-primary)"
                           secondary-color="var(--loader-secondary)"
                           :speed="0.8">
                <rect x="0"
                      y="0"
                      rx="3"
                      ry="3"
                      width="100"
                      height="12" />
                <rect x="0"
                      y="16"
                      rx="3"
                      ry="3"
                      width="75"
                      height="12" />
            </ContentLoader>
        </div>
        <ContentLoader viewBox="0 0 250 32"
                       primary-color="var(--loader-primary)"
                       secondary-color="var(--loader-secondary)"
                       :speed="0.8">
            <rect x="0"
                  y="8"
                  rx="3"
                  ry="3"
                  width="200"
                  height="5" />
            <rect x="0"
                  y="16"
                  rx="3"
                  ry="3"
                  width="150"
                  height="5" />
            <rect x="0"
                  y="28"
                  rx="3"
                  ry="3"
                  width="32"
                  height="3" />
        </ContentLoader>
    </card>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'PostReplySingleLoader',
    components: { ContentLoader }
};
</script>
