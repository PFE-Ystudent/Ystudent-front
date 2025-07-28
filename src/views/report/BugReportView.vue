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
            <div class="text-muted mt-8">
                <div class="font-semibold text-md"
                     aria-level="1">
                    Comment faire un rapport efficace
                </div>
                <ul class="list-disc px-4">
                    <li aria-level="2">
                        Essayer d'être le plus précis possible, décrivez clairement le problème que vous avez rencontré
                    </li>
                    <li aria-level="2">
                        Si possible, indiquez les étapes pour reproduire le problème
                    </li>
                    <li aria-level="2">
                        Si besoin, joigniez une capture d'écran
                    </li>
                </ul>
                <div class="px-4 text-center">
                    <div class="font-semibold text-md mt-8"
                         aria-level="1">
                        Merci pour votre contribution !
                    </div>
                    <div aria-level="2">
                        Votre retour est précieux et nous aide à améliorer l’expérience utilisateur.
                    </div>
                    <div aria-level="2">
                        Nous vous remercions de prendre le temps de nous faire part de vos suggestions et de vos rapports.
                    </div>
                    <div aria-level="2">
                        Votre aide est essentielle pour rendre l'application encore meilleure.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import CardForm from '@/components/container/CardForm.vue';
import { useToast } from '@/plugins/useToast';

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
            axios.post('/api/bug-reports', data).then(() => {
                const { sucessToast } = useToast();
                sucessToast('Rapport envoyé, merci !');
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
