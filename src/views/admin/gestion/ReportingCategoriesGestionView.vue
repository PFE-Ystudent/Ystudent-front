<template>
    <div>
        <div class="text-3xl mt-8 flex gap-4 items-center text-color">
            <router-link :to="{ name: 'Administration' }">
                <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            </router-link>
            <div class="mb-[3px]">
                Catégorie de rapport
            </div>
        </div>

        <div class="mt-8 flex flex-col items-center">
            <div v-if="showIndex"
                 class="w-4/5">
                <div class="flex justify-end mb-4">
                    <submit-button icon="fa-plus"
                                   @click="showIndex = false">
                        Créer une catégorie de rapport
                    </submit-button>
                </div>
                <IndexTable :headers="headers"
                            :base-url="baseUrl"
                            @edit="setEditMode" />
            </div>
            <div v-else
                 class="w-2/5">
                <CardForm :title="`${isEdit ? 'Modifier' : 'Créer'} une catégorie de rapport`">
                    <text-input v-model="newReportingCategory.name"
                                label="Nom :"
                                placeholder="Nom"
                                :errors="errors.name" />
                    <div>
                        Pour un bug :
                        <input v-model="newReportingCategory.forBug"
                               type="checkbox">
                    </div>
                    <div class="w-full flex justify-end gap-4 mt-4">
                        <cancel-button @click="hideForm">
                            Annuler
                        </cancel-button>
                        <submit-button v-if="isEdit"
                                       @click="editCategory">
                            Modifier
                        </submit-button>
                        <submit-button v-else
                                       @click="createCategory">
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
    data () {
        return {
            showIndex: true,
            isEdit: false,
            baseUrl: '/api/admin/reporting-categories',
            headers: [
                { key: 'id', label: 'Identifiant' },
                { key: 'name', label: 'Nom' },
                { key: 'forBug', label: 'Pour un bug', type: 'bool' },
                { key: 'isArchived', label: 'Archivé', type: 'bool' },
                { key: 'createdAt', label: 'Créé le', type: 'date' },
            ],
            newReportingCategory: {
                name: null,
                forBug: false
            },
            errors: {}
        };
    },
    methods: {
        createCategory () {
            const data = {
                name: this.newReportingCategory.name,
                for_bug: this.newReportingCategory.forBug
            };
            axios.post(this.baseUrl, data).then(() => {
                this.hideForm();
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        editCategory () {
            const data = {
                name: this.newReportingCategory.name,
                for_bug: this.newReportingCategory.forBug
            };
            axios.put(`${this.baseUrl}/${this.newReportingCategory.id}`, data).then(() => {
                this.hideForm();
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        hideForm () {
            this.showIndex = true;
            this.isEdit = false;
            this.errors = {};
            this.newReportingCategory = {
                name: null,
                forBug: false,
            };
        },
        setEditMode (reportingCategory) {
            this.newReportingCategory = reportingCategory;
            this.showIndex = false;
            this.isEdit = true;
        }
    }
};
</script>

<style scoped>

</style>