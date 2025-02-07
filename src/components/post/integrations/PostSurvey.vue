<template>
    <card class="py-2 px-4">
        <div class="flex">
            <div class="w-4/5">
                <div class="text-md font-semibold mb-4">
                    <div>{{ survey.question }}</div>
                    <div class="text-muted text-xs">{{ totalReply }} votes</div>
                </div>
                <div v-for="(option, index) in survey.options" :key="option.id" class="flex mt-2 items-center cursor-pointer survey-option" @click="selectOption(option)">
                    <div class="flex gap-1 w-3/4">
                        <div class="border border-primary bg-primary text-white w-8 text-center rounded-l-lg select-none survey-option-order">
                            {{ index + 1 }}.
                        </div>
                        <div class="border border-zinc-300 px-2 mr-4 rounded-r-lg bg-body w-full" :class="selectedId === option.id || option.isSelected && !selectedId ? 'selected-survey' : 'survey-option-name'">
                            <template v-if="selectedId !== option.id">
                                {{ option.name }}
                            </template>
                            <div v-else class="flex justify-between items-center">
                                <div class="w-full">{{ option.name }}</div>
                                <div class="pl-2 text-xs font-semibold text-nowrap select-none">
                                    <template v-if="selectedId === option.id && option.isSelected">Supprimer ?</template>
                                    <template v-else-if="isReply">Changer ?</template>
                                    <template v-else>Confirmer ?</template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isReply" class="text-muted text-xs">
                        {{ Math.round(100 / totalReply * option.replyCount) }}% <span class="text-zinc-400">({{ option.replyCount }} votes)</span>
                    </div>
                </div>
            </div>
            <div class="w-1/5 flex items-center justify-center text-sky-400">
                <font-awesome-icon icon="fa-solid fa-square-poll-vertical" size="4x" />
            </div>
        </div>
    </card>
</template>

<script>
import axios from '@/axios';

export default {
    name: 'PostSurvey',
    props: {
        survey: {
            type: Object,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            selectedId: null
        }
    },
    computed: {
        isReply () {
            return this.survey.options.find(o => o.isSelected) !== undefined
        },
        totalReply () {
            return this.survey.options.reduce((acc, cur) => acc + cur.replyCount, 0)
        }
    },
    methods: {
        selectOption (option) {
            if (this.disabled) {
                return;
            }
            if (this.selectedId !== option.id) {
                this.selectedId = option.id;
                return;
            }
            if (option.isSelected) {
                axios.delete(`/api/survey/options/${this.selectedId}`).then(res => {
                    this.$emit('update-survey', res.data.survey);
                    this.selectedId = null;
                });
            } else {
                axios.post(`/api/survey/options/${this.selectedId}`).then(res => {
                    this.$emit('update-survey', res.data.survey);
                    this.selectedId = null;
                });
            }
        }
    }
}
</script>

<style scoped>
.survey-option:hover > .survey-option-name {
    background-color: #38bdf8;
    border-color: #0891b2;
    color: white;
    transform-origin: left;
    transform: scaleX(1.02);
}
.survey-option:hover > .survey-option-order {
    background-color: #0ea5e9;
    border-color: #0284c7;
}

.selected-survey {
    background-color: #38bdf8;
    border-color: #0891b2;
    color: white;
    transform-origin: left;
    transform: scaleX(1.02);
}
</style>