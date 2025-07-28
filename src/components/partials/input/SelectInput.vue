<template>
    <div class="w-full">
        <div v-if="label"
             class="ml-1 mb-1 text-muted">
            {{ label }}
        </div>
        <multiselect v-model="internalValue"
                     :options="options"
                     :class="{'has-error': errors && errors.length, 'mt-4': !label && !noMargin }"
                     track-by="id"
                     label="name"
                     select-label="Choisir"
                     :placeholder="placeholder"
                     deselect-label="Appuyer sur entrer pour retirer"
                     selected-label="Sélectionner"
                     v-bind="$attrs"
                     preserve-search
                     :searchable="searchable"
                     @search-change="searchChange">
            <template #noResult="">
                <slot name="noResult">
                    Pas de résultat
                </slot>
            </template>
            <template #noOptions="">
                Aucun choix disponible
            </template>
            <template #maxElements>
                Nombre d'option maximum atteint
            </template>
            <template #placeholder="">
                <slot name="placeholder">
                    Choisissez une option
                </slot>
            </template>
            <template #selection="{ values }">
                <slot name="selection"
                      :values="values" />
            </template>
            <template #option="{ option }">
                <slot name="option"
                      :option="option">
                    {{ option.name }}
                </slot>
            </template>
        </multiselect>
        <div v-if="!noMargin"
             class="text-rose-500 text-xs h-4">
            <div v-for="(error, index) in errors"
                 :key="index">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

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
        placeholder: {
            type: String,
            default: 'Choisissez une option'
        },
        debounce: {
            type: Number,
            default: null
        },
        searchable: {
            type: Boolean,
            default: true
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
    data () {
        return {
            timeout: null
        };
    },
    computed: {
        internalValue: {
            get () {
                return this.modelValue;
            },
            set (value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    methods: {
        searchChange (e) {
            if (this.debounce) {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.timeout = setTimeout(() => {
                    this.$emit('select-change', e);
                    clearTimeout(this.timeout);
                }, this.debounce);
            } else {
                this.$emit('select-change', e);
            }
        }
    }
};
</script>

<!-- <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->
<style src="@/css/vue-multiselect.css"></style>