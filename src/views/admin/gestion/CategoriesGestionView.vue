<template>
    <div>
        <div class="text-3xl mt-8 flex gap-4 items-center text-color">
            <router-link :to="{ name: 'Administration' }">
                <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            </router-link>
            <div class="mb-[3px]">Catégorie</div>
        </div>
        
        <div class="mt-8 flex flex-col items-center">
            <div v-if="showIndex" class="w-4/5">
                <div class="flex justify-end mb-4">
                    <submit-button icon="fa-plus" @click="showIndex = false">
                        Créer une catégorie
                    </submit-button>
                </div>
                <IndexTable :headers="headers" :baseUrl="baseUrl" @edit="setEditMode" />
            </div>
            <div v-else class="w-2/5">
                <CardForm :title="`${isEdit ? 'Modifier' : 'Créer'} une catégorie`">
                    <text-input v-model="newCategory.name" label="Nom :" placeholder="Nom" :errors="errors.name" />
                    <div class="w-full flex justify-end gap-4 mt-4">
                        <cancel-button @click="hideForm">
                            Annuler
                        </cancel-button>
                        <submit-button v-if="isEdit" @click="editCategory">
                            Modifier
                        </submit-button>
                        <submit-button v-else @click="createCategory">
                            Créer
                        </submit-button>
                    </div>
                </CardForm>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';
import IndexTable from '@/components/partials/IndexTable.vue';

export default {
    name: 'CategoriesGestionView',
    components: {
        IndexTable,
        CardForm
    },
    data() {
        return {
            showIndex: true,
            isEdit: false,
            baseUrl: '/api/admin/categories',
            headers: [
                { key: 'id', label: 'Identifiant' },
                { key: 'name', label: 'Nom' },
                { key: 'isArchived', label: 'Archivé', type: 'bool' },
                { key: 'createdAt', label: 'Créé le', type: 'date' },
            ],
            newCategory: {
                name: null
            },
            errors: {}
        }
    },
    methods: {
        createCategory () {
            axios.post('/api/admin/categories', this.newCategory).then(() => {
                this.hideForm()
            }).catch((err) => {
                this.errors = err.response.data.errors
            });
        },
        editCategory () {
            axios.put(`/api/admin/categories/${this.newCategory.id}`, this.newCategory).then(() => {
                this.hideForm()
            }).catch((err) => {
                this.errors = err.response.data.errors
            });
        },
        hideForm () {
            this.showIndex = true;
            this.isEdit = false;
            this.errors = {};
            this.newCategory = {
                name: null
            };
        },
        setEditMode (category) {
            this.newCategory = category;
            this.showIndex = false;
            this.isEdit = true;
        }
    }
}
</script>

<style scoped>

</style>