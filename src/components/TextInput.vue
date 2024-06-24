<template>
    <div class="w-full">
        <div v-if="label" class="ml-1 mb-1 text-zinc-500">
            {{ label }}
        </div>
        <div class="w-full relative">
            <input v-model="value"
                :type="inputType"
                class="w-full flex border rounded-md shadow hover:outline-none outline-none border-zinc-300 focus:border-zinc-600 p-1"
                :class="{'!border-rose-500': errors}" @keyup="() => $emit('update', value)"/>
            <template v-if="type === 'password'">
                <div v-if="inputType === 'password'"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2"
                    @click="inputType = 'text'">
                    <font-awesome-icon icon="fa-solid fa-eye"
                        class="text-zinc-300 cursor-pointer" />
                </div>
                <div v-else
                    class="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-eye-slash"
                        @click="inputType = 'password'"
                        class="text-zinc-300 cursor-pointer" />
                </div>
            </template>
        </div>
        <div class="text-rose-500 text-xs h-4">
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
        defaultValue: {
            type: String,
            default: null    
        },
        errors: {
            type: Array,
            default: null
        }
    },
    data () {
        return {
            value: null,
            inputType: 'text',

        }
    },
    mounted () {
        this.value = this.defaultValue
        this.inputType = this.type
    }
}
</script>

<style scoped>
.shadow {
    box-shadow: inset 0 1px 3px #ddd;
}
</style>