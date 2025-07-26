<template>
    <div class="flex justify-center">
        <div class="text-color w-full px-4 md:px-0 md:w-1/2">
            <div v-for="(log, index) in logs"
                 :key="index">
                <div class="font-semibold text-lg mb-2 flex gap-4">
                    <div>{{ log.date }}</div>
                    <div class="border-l border-secondary" />
                    <badge color="#38bdf8">
                        {{ log.version }}
                    </badge>
                </div>
                <ul class="ml-2">
                    <li v-for="(line, lineIndex) in log.content"
                        :key="lineIndex"
                        class="flex gap-2 mb-2">
                        <badge color="#00bc7d">
                            <font-awesome-icon :icon="`fa-solid fa-${line.type}`" />
                        </badge>
                        {{ line.text }}
                    </li>
                </ul>
                <hr class="border-secondary mb-8">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangeLog',
    data () {
        return {
            logs: [
                {
                    version: 'v1.0.1',
                    date: '27/07/2025',
                    content: [
                        { type: 'add', text: 'Navigation au clavier' }
                    ]
                },
            ]
        };
    },
};
</script>
