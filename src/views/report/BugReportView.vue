<template>
    <div class="w-full mt-8 mb-32 flex justify-center">
        <div class="w-full md:w-3/5">
            <CardForm title="Rapport">
                <select-input v-model="form.category"
                              label="Catégorie de rapport :"
                              :options="categories"
                              :errors="errors.reporting_category_id" />
                <text-input v-model="form.description"
                            type="textarea"
                            label="Description :"
                            placeholder="Description"
                            :errors="errors.description" />
                <div class="w-full flex justify-end gap-4">
                    <submit-button :is-busy="isBusy"
                                   @click="send">
                        Envoyer
                    </submit-button>
                </div>
            </CardForm>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';

export default {
    name: 'BugReportView',
    components: {
        CardForm
    },
    data () {
        return {
            categories: [],
            isBusy: false,
            form: {
                category: null,
                description: null
            },
            errors: {}
        };
    },
    mounted () {
        axios.get('/api/reporting-categories/bug').then(res => {
            this.categories = res.data.categories;
        });
    },
    methods: {
        send () {
            this.isBusy = true;
            const data = {
                description: this.form.description,
                reporting_category_id: this.form.category?.id
            };
            axios.post('/api/bug-report', data).then(() => {
                this.$router.push({ name: 'Dashboard' });
            }).catch(err => {
                this.errors = err.response.data.errors ?? {};
            }).finally(() => {
                this.isBusy = false;
            });
        }
    },
};
</script>
