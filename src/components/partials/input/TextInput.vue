<template>
    <div class="w-full">
        <div v-if="label" class="ml-1 mb-1 text-muted">
            {{ label }}
        </div>
        <div :class="['w-full relative', {'mt-4': !label && !noMargin}]">
            <textarea v-if="inputType === 'textarea'" v-model="internalValue" rows="8"
            class="w-full flex border rounded-md shadow hover:outline-none outline-none border-secondary bg-body focus:border-zinc-600 p-1"
            :class="[{'!border-rose-500': errors}, inputClass]"
            :disabled="disabled"
            @keypress.enter="$emit('enter')"
            @change="$emit('change', $event)"></textarea>
            <input v-else v-model="internalValue"
                :type="inputType"
                :placeholder="placeholder"
                class="w-full h-8 flex border rounded-md shadow hover:outline-none outline-none border-secondary bg-body focus:border-zinc-600 disabled:bg-zinc-200 disabled:border-zinc-400 disabled:text-zinc-400 p-1"
                :class="[{'!border-rose-500': errors}, inputClass]"
                :style="type === 'password' || clearable ? 'padding-right: 38px;' : ''"
                :disabled="disabled"
                @keypress.enter="$emit('enter')"
                @input="$emit('input', $event)"
                @change="$emit('change', $event)" />
            <template v-if="type === 'password'">
                <div v-if="inputType === 'password'"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                    @click="inputType = 'text'">
                    <font-awesome-icon icon="fa-solid fa-eye"
                        class="text-sky-400 cursor-pointer" />
                </div>
                <div v-else
                    class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-eye-slash"
                        @click="inputType = 'password'"
                        class="text-sky-400 cursor-pointer" />
                </div>
            </template>
            <template v-else-if="clearable">
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2"
                    @click="clear">
                    <font-awesome-icon icon="fa-solid fa-xmark"
                        class="text-zinc-300 hover:text-sky-400 cursor-pointer" />
                </div>
            </template>
        </div>
        <div v-if="!noMargin" class="text-rose-500 text-xs h-4">
            <div v-for="(error, index) in errors" :key="index">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TextInput",
    props: {
        label: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'text'
        },
        modelValue: {
            type: String,
            default: null
        },
        inputClass: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
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
    data () {
        return {
            inputType: 'text',
        }
    },
    mounted () {
        this.inputType = this.type
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
    },
    methods: {
        clear () {
            this.internalValue = null;
            this.$emit('input', null)
        }
    }
}
</script>

<style scoped>
.shadow {
    box-shadow: inset 0 1px 3px #ddd;
}
</style>