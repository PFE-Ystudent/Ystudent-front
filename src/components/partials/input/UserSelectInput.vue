<template>
    <select-input v-bind="$attrs"
                  v-model="internalValue"
                  multiple
                  :max="max"
                  placeholder="Recherche"
                  :show-no-options="false">
        <template #option="{ option }">
            <div class="flex gap-4 items-center">
                <UserAvatar class="w-8 h-8"
                            :avatar="option.avatar" />
                <div>
                    <div class="font-semibold">
                        {{ option.name }}
                    </div>
                    <div class="text-xs text-zinc-400">
                        Membre
                    </div>
                </div>
            </div>
        </template>
        <template #selection="{ values }">
            <div class="flex gap-2">
                <div v-for="option in values"
                     :key="option.id"
                     class="bg-primary border border-primary flex items-center justify-between font-semibold rounded-full text-white w-min">
                    <div class="flex gap-2">
                        <div>
                            <UserAvatar class="w-5 h-5"
                                        :avatar="option.avatar" />
                        </div>
                        <div>
                            {{ option.name }}
                        </div>
                    </div>
                    <div class="text-sky-800 px-2 hover:text-white cursor-pointer"
                         @click="removeOption(option.id)">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </div>
                </div>
            </div>
        </template>
        <template #placeholder="">
            Recherche
        </template>
        <template #noResult="">
            <div v-if="isBusy"
                 class="text-sky-400">
                <font-awesome-icon icon="fa-solid fa-circle-notch"
                                   spin />
                <span class="text-zinc-300 ml-4">Recherche...</span>
            </div>
            <div v-else>
                Pas de résultat
            </div>
        </template>
    </select-input>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';

export default {
    name: 'UserSelectInput',
    components: {
        UserAvatar,
    },
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Array, Object],
            default: null
        },
        isBusy: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 1
        }
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
        removeOption (id) {
            this.internalValue = this.internalValue.filter(o => o.id !== id);
        }
    }
};
</script>

<style scoped>

</style>