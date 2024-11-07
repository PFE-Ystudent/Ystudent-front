<template>
    <div class="w-full bg-zinc-50 border border-zinc-300 rounded-md p-4">
        <div class="font-semibold text-lg mb-2">Recherche</div>
        <hr class="mb-2" />

        <TextInput v-model="filter.search" label="Mots clés :" placeholder="Mots clés" noMargin />
        <TextInput v-model="filter.author" label="Auteur :" placeholder="Auteur" class="mt-2" noMargin />
        <SelectInput v-model="filter.categories" label="Catégories :" multiple :options="categories" class="mt-2" noMargin />

        <div class="flex justify-end mt-4 gap-4">
            <CancelButton @click="clear">
                <font-awesome-icon icon="fa-solid fa-filter-circle-xmark" />
            </CancelButton>
            <SubmitButton @click="send">
                <font-awesome-icon icon="fa-solid fa-filter" />
                Filtrer
            </SubmitButton>
        </div>
    </div>
</template>

<script>
import SubmitButton from '@/components/SubmitButton.vue';
import TextInput from '@/components/TextInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import CancelButton from '@/components/CancelButton.vue';

export default {
    name: 'PostFilter',
    components: {
        SubmitButton,
        TextInput,
        SelectInput,
        CancelButton
    },
    props: {
        categories: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            filter: {
                search: null,
                author: null,
                categories: []
            }
        }
    },
    methods: {
        send () {
            const filterData = {...this.filter}
            filterData.categories = filterData.categories.map(c => c.id)

            this.$emit('filter', filterData)
        },
        clear () {
            this.filter = {
                search: null,
                author: null,
                categories: []
            }
            this.$emit('filter', this.filter)
        }
    },
}
</script>

<style scoped>

</style>