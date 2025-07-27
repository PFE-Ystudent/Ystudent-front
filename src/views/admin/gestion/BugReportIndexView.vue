<template>
    <div class="flex flex-col-reverse md:flex-row gap-4 mt-8">
        <div class="w-full md:w-2/3 lg:w-1/2">
            <div class="mt-4 mb-32">
                <div class="sticky top-[62px]"
                     style="z-index: 1;">
                    <div class="bg-body pt-4">
                        <TabNav :tabs="tabs"
                                :default-tab="activeTab"
                                @select="setTab" />
                    </div>
                </div>
                <div class="mt-4 flex flex-col justify-center gap-4">
                    <template v-if="!isBusy">
                        <template v-if="bugReports.length">
                            <BugReport v-for="bugReport in bugReports"
                                       :key="bugReport.id"
                                       :bug="bugReport"
                                       @update="update"
                                       @update-status="updateStatus" />
                        </template>
                        <div v-else
                             class="flex justify-center mt-4">
                            <div
                                class="text-lg font-semibold flex items-center gap-4">
                                <font-awesome-icon icon="fa-solid fa-circle-exclamation"
                                                   class="text-sky-400" />
                                Pas de résultats
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="w-full md:w-1/3 lg:w-1/2">
            <card class="mt-8">
                <div class="flex gap-2 my-4 text-center">
                    <div class="w-1/4 flex items-center justify-center text-lg font-semibold">
                        Mois dernier
                    </div>
                    <BugReportStat name="Ouvert"
                                   :stat="stats.lastMonth && stats.lastMonth.opened"
                                   class="w-1/4" />
                    <BugReportStat name="Résolu"
                                   :stat="stats.lastMonth && stats.lastMonth.resolved"
                                   class="w-1/4" />
                    <BugReportStat name="Fermé"
                                   :stat="stats.lastMonth && stats.lastMonth.closed"
                                   class="w-1/4" />
                </div>
                <hr class="mx-auto w-2/3 border-secondary">
                <div class="flex gap-2 my-4 text-center">
                    <div class="w-1/4 flex items-center justify-center text-lg font-semibold">
                        Au total
                    </div>
                    <BugReportStat name="Ouvert"
                                   :stat="stats.totals && stats.totals.opened"
                                   class="w-1/4" />
                    <BugReportStat name="Résolu"
                                   :stat="stats.totals && stats.totals.resolved"
                                   class="w-1/4" />
                    <BugReportStat name="Fermé"
                                   :stat="stats.totals && stats.totals.closed"
                                   class="w-1/4" />
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import TabNav from '@/components/partials/TabNav.vue';
import BugReport from '@/components/admin/BugReport.vue';
import axios from '@/axios';
import BugReportStat from '@/components/admin/BugReportStat.vue';

export default {
    name: 'BugReportIndexView',
    components: {
        TabNav,
        BugReport,
        BugReportStat
    },
    data () {
        return {
            isBusy: false,
            bugReports: [],
            stats: {
                lastMonth: null,
                totals: null,
            },
            activeTab: 'opened',
            tabs: [
                { name: 'Ouvert', value: 'opened' },
                { name: 'En cours', value: 'processed' },
                { name: 'Clôturé', value: 'done' }
            ],
        };
    },
    mounted () {
        this.fetchBugReports();
        axios.get('/api/admin/bug-reports/stats').then((res) => {
            this.stats = res.data.stats;
        });
    },
    methods: {
        fetchBugReports () {
            this.isBusy = true;
            axios.get(`/api/admin/bug-reports/${this.activeTab}`).then((res) => {
                    this.bugReports = res.data.bugReports;
                }).finally(() => {
                    this.isBusy = false;
                });
        },
        setTab (newTab) {
            this.activeTab = newTab;
            this.bugReports = [];
            this.fetchBugReports();
        },
        updateStatus (id) {
            this.bugReports = this.bugReports.filter(b => b.id !== id);
        },
        update ({ id, field, value }) {
            const bugReport = this.bugReports.find(b => b.id === id);
            bugReport[field] = value;
        }
    }
};
</script>

<style></style>
