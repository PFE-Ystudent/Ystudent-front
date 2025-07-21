<template>
    <div class="absolute w-[320px] bg-secondary border border-secondary rounded-md shadow px-2 pb-2 cursor-auto"
         style="z-index: 10;"
         @mouseenter="isHover = true"
         @mouseleave="isHover = false">
        <div v-if="user">
            <div class="relative flex justify-center split-bg">
                <UserAvatar class="w-24 h-24"
                            :avatar="user.avatar"
                            custom-class="!p-2 !bg-secondary" />
                <TooltipAction :actions="actions"
                               :is-hover="isHover"
                               class="absolute top-0 right-0 text-sky-400 cursor-pointer"
                               @select-action="selectAction">
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"
                                       class="p-4" />
                </TooltipAction>
            </div>
            <div class="bg-body rounded-b-md p-2">
                <div class="text-center font-semibold text-lg">
                    {{ user.username }}
                </div>
                <hr class="border-secondary my-2 mx-8">
                <div class="min-h-12">
                    {{ user.about }}
                </div>
                <div class="flex justify-around py-4 text-sky-400">
                    <div class="flex items-center font-semibold gap-2 hover:text-sky-500 cursor-pointer">
                        <div class="text-lg">
                            {{ user.postsCount }}
                        </div>
                        <font-awesome-icon icon="fa-solid fa-message" />
                    </div>
                    <div class="flex items-center font-semibold gap-2 hover:text-sky-500 cursor-pointer">
                        <div class="text-lg">
                            {{ user.postRepliesCount }}
                        </div>
                        <font-awesome-icon icon="fa-solid fa-reply" />
                    </div>
                </div>
                <div class="text-end text-xs text-zinc-400">
                    Actif depuis le {{ createdAt }}
                </div>
            </div>
        </div>
        <div v-else>
            <div class="relative flex justify-center split-bg">
                <ContentLoader width="96"
                               height="96"
                               primary-color="var(--loader-primary)"
                               secondary-color="var(--loader-secondary)"
                               :speed="0.8"
                               class="p-2 bg-secondary rounded-full">
                    <circle cx="48"
                            cy="48"
                            r="48" />
                </ContentLoader>
            </div>
            <div class="bg-body rounded-b-md p-2">
                <div class="flex justify-center">
                    <ContentLoader width="128"
                                   height="16"
                                   primary-color="var(--loader-primary)"
                                   secondary-color="var(--loader-secondary)"
                                   :speed="0.8">
                        <rect x="0"
                              y="0"
                              rx="3"
                              ry="3"
                              width="128"
                              height="16" />
                    </ContentLoader>
                </div>
                <hr class="border-zinc-100 my-2 mx-8">
                <div class="h-12">
                    <ContentLoader width="100%"
                                   height="100%"
                                   primary-color="var(--loader-primary)"
                                   secondary-color="var(--loader-secondary)"
                                   :speed="0.8">
                        <rect x="0"
                              y="8"
                              rx="3"
                              ry="3"
                              width="100%"
                              height="12" />
                        <rect x="0"
                              y="24"
                              rx="3"
                              ry="3"
                              width="100%"
                              height="12" />
                        <rect x="0"
                              y="40"
                              rx="3"
                              ry="3"
                              width="70%"
                              height="12" />
                    </ContentLoader>
                </div>
                <div class="flex justify-around py-4">
                    <ContentLoader width="32"
                                   height="20"
                                   primary-color="var(--loader-primary)"
                                   secondary-color="var(--loader-secondary)"
                                   :speed="0.8">
                        <rect x="0"
                              y="0"
                              rx="3"
                              ry="3"
                              width="32"
                              height="20" />
                    </ContentLoader>
                    <ContentLoader width="32"
                                   height="30"
                                   primary-color="var(--loader-primary)"
                                   secondary-color="var(--loader-secondary)"
                                   :speed="0.8">
                        <rect x="0"
                              y="0"
                              rx="3"
                              ry="3"
                              width="32"
                              height="20" />
                    </ContentLoader>
                </div>
                <div>
                    <ContentLoader width="100%"
                                   height="8"
                                   primary-color="var(--loader-primary)"
                                   secondary-color="var(--loader-secondary)"
                                   :speed="0.8">
                        <rect x="calc(100% - 100px)"
                              y="0"
                              rx="3"
                              ry="3"
                              width="100"
                              height="8" />
                    </ContentLoader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import { ContentLoader } from 'vue-content-loader';
import store from '@/store';
import UserAvatar from '@/components/user/UserAvatar.vue';

export default {
    name: 'UserProfilePopup',
    components: {
        TooltipAction,
        ContentLoader,
        UserAvatar
    },
    props: {
        userId: {
            type: Number,
            required: true
        },
    },
    data () {
        return {
            user: null,
            authUser: store.state.auth.user,
            isHover: false
        };
    },
    computed: {
        actions () {
            const actions = [
                { value: 'show', label: 'Voir' },
            ];
            if (this.user.id === this.authUser.id) {
                actions.push({ value: 'edit', label: 'Modifier' });
            } else {
                actions.push({ value: 'contact', label: 'Contacter' });

                if (!this.user.relationType) {
                    actions.push({ value: 'add', label: 'Ajouter' });
                }

                actions.push({ value: 'report', label: 'Signaler' });
            }
            return actions;
        },
        createdAt () {
            return new Date(this.user.createdAt).toLocaleString('fr', { hour12: false, dateStyle: 'short' });
        }
    },
    mounted () {
        axios.get(`/api/users/${this.userId}`).then(res => {
                    this.user = res.data;
                }).catch(() => {
                    // TODO: gérer l'erreur
                });
    },
    methods: {
        selectAction (action) {
            if (action === 'show') {
                this.$router.push({ name: 'UserDetails', params: { id: this.userId } });
            } else if (action === 'add') {
                axios.post(`/api/users/${this.userId}/relations/request`).then(() => {
                    this.user.relationType = 3;
                }).catch(() => {
                    // TODO: Gérer l'erreur
                });
            }
        }
    },
};
</script>

<style scoped>
.split-bg {
    background: linear-gradient(to bottom, transparent 60%, var(--color-body) 40%);
}
</style>