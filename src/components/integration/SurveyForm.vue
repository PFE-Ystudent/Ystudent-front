<template>
    <div class="relative border border-zinc-300 rounded-md px-4 pt-4">
        <div class="absolute top-0 left-4 text-zinc-300 text-sm font-semibold -translate-y-1/2 bg-zinc-50 px-1 uppercase">Sondage</div>
        <div class="flex">
            <TextInput v-model="data.question" placeholder="Question" noMargin @change="$emit('update', data)" />
            <div class="w-16 pl-4 flex justify-center items-center">
                <button class="text-zinc-300 hover:text-rose-500 font-semibold" @click="$emit('delete')">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </div>
        </div>
        <div class="w-2/3">
            <div v-for="(option, index) in data.options" :key="index" class="flex items-center gap-2 mt-4">
                <div class="text-sky-400 w-8 h-8 flex border rounded-md text-center border-zinc-300 p-1 rounded-r-none">
                    {{ index + 1 }}.
                </div>
                <TextInput v-model="data.options[index]" inputClass="rounded-l-none" placeholder="Nouveau choix" noMargin @change="$emit('update', data)" />
                <CancelButton class="h-8" @click="removeOption(index)">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </CancelButton>
            </div>
            <div class="flex gap-4 items-center">
                <TextInput v-model="newOption" @enter="addOption" />
                <div>
                    <SubmitButton @click="addOption">
                        Ajouter
                    </SubmitButton> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CancelButton from '../CancelButton.vue';
import SubmitButton from '../SubmitButton.vue';
import TextInput from '../TextInput.vue';

export default {
    name: 'SurveyForm',
    components: {
        TextInput,
        SubmitButton,
        CancelButton
    },
    props: {
        survey: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            newOption: null,
            data: {
                question: null,
                options: []
            }
        }
    },
    methods: {
        addOption () {
            this.data.options.push(this.newOption);
            this.newOption = null;
            this.$emit('update', this.data)
        },
        removeOption(index) {
            this.data.options = this.data.options.filter((o, i) => i !== index)
            this.$emit('update', this.data)
        }
    }
}
</script>

<style scoped>

</style>