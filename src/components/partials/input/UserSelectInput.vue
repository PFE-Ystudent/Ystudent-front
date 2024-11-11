<template>
    <select-input v-bind="$attrs">
        <template #option="{ option }">
        <div class="flex gap-4 items-center">
            <UserAvatar class="w-8 h-8" :avatar="option.avatar" />
            <div>
                <div class="font-semibold">{{ option.name }}</div>
                <div class="text-xs text-zinc-400">Membre</div>
            </div>
        </div>
    </template>
    </select-input>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';

export default {
    name: 'UserSelectInput',
    inheritAttrs: false,
    components: {
        UserAvatar,
    },
}
</script>

<style scoped>

</style>