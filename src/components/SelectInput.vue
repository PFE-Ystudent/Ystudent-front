<template>
    <div class="w-full">
        <div v-if="label" class="ml-1 mb-1 text-zinc-500">
            {{ label }}
        </div>
        <multiselect v-model="internalValue" :multiple="multiple" :options="options"
            :class="{'has-error': errors && errors.length, 'mt-4': !label && !noMargin }"
            track-by="id" label="name"
            selectLabel="Choisir" placeholder="Choisissez une option" deselectLabel="Appuyer sur entrer pour retirer" selectedLabel="Sélectionner"
            :searchable="true">
            <template #noResult="">
                Pas de résultat
            </template>
            <template #noOptions="">
                Aucun choix disponible
            </template>
            <template #placeholder="">
                Choisissez une option
            </template>
        </multiselect>
        <div v-if="!noMargin" class="text-rose-500 text-xs h-4">
            <div v-for="(error, index) in errors" :key="index">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'SelectInput',
    components: {
        Multiselect
    },
    props: {
        options: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: [String, Array, Object],
            default: null
        },
        label: {
            type: String,
            default: null
        },
        multiple: {
            type: Boolean,
            default: false
        },
        noMargin: {
            type: Boolean,
            default: false,
        },
        errors: {
            type: Array,
            default: null
        }
    },
    computed: {
        internalValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
}
</script>

<!-- <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->
<style src="../css/vue-multiselect.css"></style>