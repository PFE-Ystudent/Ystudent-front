<template>
    <div class="fixed top-0 bottom-0 bg-secondary border-r border-r-secondary rounded-br-md ease-in duration-100"
        @mouseenter="isDeploy = true" @mouseleave="isDeploy = false" :style="`z-index: 100; width: ${isDeploy ? 200 : 72}px;`">
        <div class="flex flex-col items-center">
            <div class="my-8">
                <div class="w-12 h-12 bg-zinc-300 cursor-pointer" @click="$router.push({ name: 'Dashboard' })"></div>
            </div>
            <div class="mt-8 w-full flex flex-col gap-4">
                <SideBarItem name="Posts" icon="fa-message" route="Post" :is-deploy="isDeploy" />
                <SideBarItem name="Relations" icon="fa-user-group" route="Relation" :is-deploy="isDeploy" />
                <SideBarItem name="Conversations" icon="fa-comments" route="Conversation" :is-deploy="isDeploy" />
                <template v-if="isAdmin">
                    <hr class="w-12 mx-auto border-secondary">
                    <SideBarItem name="Administration" icon="fa-toolbox" route="Administration" :is-deploy="isDeploy" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import SideBarItem from '@/components/sidebar/SideBarItem.vue';

export default {
    name: "SideBar",
    components: {
        SideBarItem
    },
    data () {
        return {
            isAdmin: store.getters.isAdmin,
            isDeploy: false
        }
    }
}
</script>
