<template>
    <card class="w-full p-4 text-color">
        <div class="font-semibold text-lg mb-2">
            Recherche
        </div>
        <hr class="mb-2 border-secondary">

        <text-input v-model="filter.search"
                    label="Mots clés :"
                    placeholder="Mots clés"
                    no-margin />
        <text-input v-model="filter.author"
                    label="Auteur :"
                    placeholder="Auteur"
                    class="mt-2"
                    no-margin />
        <select-input v-model="filter.categories"
                      label="Catégories :"
                      multiple
                      :options="categories"
                      class="mt-2"
                      no-margin />

        <div class="flex justify-end mt-4 gap-4">
            <cancel-button @click="clear">
                <font-awesome-icon icon="fa-solid fa-filter-circle-xmark" />
            </cancel-button>
            <submit-button icon="fa-filter"
                           @click="send">
                Filtrer
            </submit-button>
        </div>
    </card>
</template>

<script>
export default {
    name: 'PostFilter',
    props: {
        categories: {
            type: Array,
            default: () => []
        },
    },
    data () {
        return {
            filter: {
                search: null,
                author: null,
                categories: []
            }
        };
    },
    methods: {
        send () {
            const filterData = { ...this.filter };
            filterData.categories = filterData.categories.map(c => c.id);

            this.$emit('filter', filterData);
        },
        clear () {
            this.filter = {
                search: null,
                author: null,
                categories: []
            };
            this.$emit('filter', this.filter);
        }
    },
};
</script>

<style scoped>

</style>