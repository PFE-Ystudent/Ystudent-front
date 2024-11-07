<template>
        <nav role="navigation" className="flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <ul className="relative z-0 inline-flex shadow-sm rounded-md bg-sky-400">
                        <!-- Previous Page Link -->
                        <template v-if="currentPage === 1">
                            <li className="disabled">
                                <span>
                                    <span className="h-full relative inline-flex items-center px-2 py-2 text-sm font-medium text-white border border-sky-500 cursor-default rounded-l-md leading-5" aria-hidden="true">
                                        <font-awesome-icon icon="fa-solid fa-chevron-left" />
                                    </span>
                                </span>
                            </li>
                        </template>
                        <template v-else>
                            <li>
                                <a @click="() => setPage(currentPage - 1)" rel="prev">
                                    <span className="h-full hover:bg-sky-500 cursor-pointer relative inline-flex items-center px-2 py-2 text-sm font-medium text-white border border-sky-500 rounded-l-md leading-5" aria-hidden="true">
                                        <font-awesome-icon icon="fa-solid fa-chevron-left" />
                                    </span>
                                </a>
                            </li>
                        </template>

                        <li v-if="currentPage > 3" className="hidden-xs">
                            <a @click="() => setPage(1)" className="cursor-pointer relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white border border-sky-500 leading-5">
                                1
                            </a>
                        </li>
                        <li v-if="currentPage > 4">
                            <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white border border-sky-500 cursor-default leading-5">
                                ...
                            </span>
                        </li>

                        <template v-for="i in [...Array(lastPage).keys()].map(i => i + 1)">
                            <template v-if="i >= currentPage - 1 && i <= currentPage + 1">
                                <li v-if="i === currentPage" className="active" :key="i">
                                    <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-sky-600 border border-sky-600 cursor-default leading-5">
                                        {{ i }}
                                    </span>
                                </li>
                                <li v-else :key="`${i}`">
                                    <a @click="() => setPage(i)" className="hover:bg-sky-500 cursor-pointer relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white border border-sky-500">
                                        {{ i }}
                                    </a>
                                </li>
                            </template>
                        </template>
                        <li v-if="currentPage < lastPage - 3">
                            <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white border border-sky-500 cursor-default leading-5">
                                ...
                            </span>
                        </li>
                        <li v-if="currentPage < lastPage - 2" className="hidden-xs">
                            <a @click="() => setPage(lastPage)" className="hover:bg-sky-500 cursor-pointer relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white border border-sky-500 leading-5">
                                {{ lastPage }}
                            </a>
                        </li>

                        <!-- Next Page Link -->
                        <li v-if="currentPage < lastPage">
                            <a @click="() => setPage(currentPage + 1)" rel="next">
                                <span className="h-full hover:bg-sky-500 cursor-pointer inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-white border border-sky-500 rounded-r-md leading-5" aria-hidden="true">
                                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                                </span>
                            </a>
                        </li>
                        <li v-else className="disabled">
                            <span>
                                <span className="h-full inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-white border border-sky-500 cursor-default rounded-r-md leading-5" aria-hidden="true">
                                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>

export default {
    name: 'PaginatorSelect',
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        lastPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    methods: {
        setPage (newPage) {
            this.currentPage = newPage;
            this.$emit('change');
        }
    }
}
</script>
