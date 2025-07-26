<template>
    <div class="fixed top-0 bottom-0 bg-secondary border-r border-r-secondary rounded-br-md ease-in duration-100 flex flex-col justify-between"
         :style="`z-index: 100; width: ${isDeploy ? 200 : 72}px;`"
         @mouseenter="isDeploy = true"
         @mouseleave="isDeploy = false">
        <div class="flex flex-col items-center">
            <div class="my-8">
                <div class="w-12 h-12 bg-zinc-300 cursor-pointer"
                     @click="$router.push({ name: 'Dashboard' })" />
            </div>
            <div class="mt-8 w-full flex flex-col gap-4">
                <SideBarItem name="Posts"
                             icon="fa-message"
                             route="Post"
                             :is-deploy="isDeploy"
                             @selected="selected"
                             @focus="deploy(true)"
                             @blur="deploy(false)" />
                <SideBarItem name="Relations"
                             icon="fa-user-group"
                             route="Relation"
                             :is-deploy="isDeploy"
                             @selected="selected"
                             @focus="deploy(true)"
                             @blur="deploy(false)" />
                <SideBarItem name="Conversations"
                             icon="fa-comments"
                             route="Conversation"
                             :is-deploy="isDeploy"
                             @selected="selected"
                             @focus="deploy(true)"
                             @blur="deploy(false)" />
                <template v-if="isAdmin">
                    <hr class="w-12 mx-auto border-secondary">
                    <SideBarItem name="Administration"
                                 icon="fa-toolbox"
                                 route="Administration"
                                 :is-deploy="isDeploy"
                                 @selected="selected"
                                 @focus="deploy(true)"
                                 @blur="deploy(false)" />
                </template>
            </div>
        </div>
        <div>
            <div v-if="isDeploy"
                 class="text-muted text-sm mb-8 text-center overflow-hidden">
                <button class="text-nowrap"
                        @click="navigate('ChangeLog', true)">
                    notes de mise à jour
                </button>
                <button class="mt-1 text-nowrap"
                        @click="navigate('BugReportView')">
                    Remonter un problème
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import SideBarItem from '@/components/sidebar/SideBarItem.vue';

export default {
    name: 'SideBar',
    components: {
        SideBarItem
    },
    data () {
        return {
            isAdmin: store.getters.isAdmin,
            isDeploy: window.innerWidth < 768
        };
    },
    methods: {
        selected (name) {
            this.$emit('selected', name);
        },
        deploy (state) {
            this.isDeploy = state;
        },
        navigate (route, newTab) {
            this.selected(route);
            if (newTab) {
                window.open(this.$router.resolve({ name: route }).href, '_blank');
            } else {
                this.$router.push({ name: route });
            }
        }
    },
};
</script>
