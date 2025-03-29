<template>
    <div class="w-full">
        <table class="admin-table">
            <thead>
                <tr>
                    <th v-for="line in headers"
                        :key="line.key"
                        class="text-color">
                        {{ line.label }}
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <template v-if="!isBusy">
                    <template v-if="data.length">
                        <tr v-for="row in data"
                            :key="row.id">
                            <td v-for="line in headers"
                                :key="`${row.id}-${line.key}`">
                                <template v-if="line.type && line.type === 'bool'">
                                    <input type="checkbox"
                                           disabled
                                           :checked="row[line.key] ? 1 : 0">
                                </template>
                                <template v-else-if="line.type && line.type === 'date'">
                                    {{ formatDate(row[line.key]) }}
                                </template>
                                <template v-else>
                                    {{ row[line.key] }}
                                </template>
                            </td>
                            <td>
                                <div class="flex justify-end gap-2">
                                    <submit-button icon="fa-edit"
                                                   @click="$emit('edit', row)" />
                                    <submit-button v-if="!row.isArchived"
                                                   icon="fa-trash"
                                                   @click="deleteRow(row.id)" />
                                    <submit-button v-else
                                                   icon="fa-trash-can-arrow-up"
                                                   @click="restoreRow(row.id)" />
                                </div>
                            </td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td :colspan="headers.length"
                            class="text-center">
                            Aucune donnée
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td v-for="i in headers.length"
                        :key="i"
                        class="text-center">
                        <ContentLoader width="128"
                                       height="24"
                                       primary-color="var(--loader-primary)"
                                       secondary-color="var(--loader-secondary)"
                                       :speed="0.8">
                            <rect x="0"
                                  y="2"
                                  rx="3"
                                  ry="3"
                                  width="128"
                                  height="20" />
                        </ContentLoader>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from '@/axios';
import formatDate from '@/mixins/formatDate';
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'IndexTable',
    components: {
        ContentLoader
    },
    mixins: [formatDate],
    props: {
        headers: {
            type: Array,
            required: true
        },
        baseUrl: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            data: [],
            isBusy: false
        };
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        fetchData () {
            this.isBusy = true;
            axios.get(this.baseUrl).then((res) => {
                this.data = res.data.data;
            }).finally(() => {
                this.isBusy = false;
            });
        },
        deleteRow (id) {
            axios.delete(`${this.baseUrl}/${id}`).then(() => {
                const row = this.data.find(d => d.id === id);
                row.isArchived = true;
            });
        },
        restoreRow (id) {
            axios.post(`${this.baseUrl}/${id}/restore`).then(() => {
                const row = this.data.find(d => d.id === id);
                row.isArchived = false;
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>