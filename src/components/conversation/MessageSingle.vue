<template>
    <div class="w-full flex" :class="isCurrentUser ? 'justify-end' : 'justify-start'">
        <div class="flex w-4/5 gap-2" :class="{ 'flex-row-reverse': isCurrentUser }">
            <UserAvatar v-if="withAvatar" class="w-12 h-12" :avatar="message.sender.avatar" />
            <div v-else class="w-12 h-12"></div>
            <div class="relative min-w-36" style="max-width: calc(100% - 56px)" @mouseenter="isHover = true" @mouseleave="isHover = false">
                <div class="p-2 mt-2 rounded-b-md" :class="[isCurrentUser ? 'bg-zinc-200 text-black rounded-tl-md' : 'bg-sky-300 text-white rounded-tr-md', { '!bg-zinc-300': isEditable }]">
                    <div ref="messageContent" :contentEditable="isEditable" class="outline-none whitespace-pre-wrap" onKeyDown={editMessageAction}>
                      {{ message.content }}
                    </div>
                    <div v-if="message.files && message.files.length" class="flex gap-2 mt-2">
                        <a v-for="(file, i) in message.files" :key="i" target="_blank" :href="file.path" class="p-2 max-w-120 sm:max-w-40 cursor-pointer flex items-center gap-2 bg-[#2121217F] text-sm rounded-md" rel="noreferrer">
                            F
                            <div class="w-4/5 text-nowrap text-ellipsis overflow-hidden">
                            {{ file.name }}
                            </div>
                        </a>
                    </div>
                    <div class="text-[10px] w-full mt-1 flex" :class="isCurrentUser ? 'text-black justify-start' : 'text-white justify-end'">
                        {{ formatTimestamp(message.createdAt) }}{{message.isUpdated ? ' • (modifié)' : '' }}
                    </div>
                </div>
                <div v-if="isHover && isCurrentUser" class="absolute -bottom-2 text-white flex shadow rounded-md border right-2 bg-zinc-400">
                    <template v-if="!isEditable">
                        <div class="px-1.5 py-px hover:bg-sky-300 cursor-pointer" @click="isEditable = true">
                            <font-awesome-icon icon="fa-solid fa-pen" />
                        </div>
                        <div class="px-1.5 py-px hover:bg-sky-300 cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-reply" />
                        </div>
                        <div class="px-1.5 py-px hover:bg-sky-300 cursor-pointer" onClick={deleteMessageAction}>
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </div>
                    </template>
                    <div v-else class="px-1.5 py-px hover:bg-sky-300 cursor-pointer" onClick={saveEdit}>
                        <font-awesome-icon icon="fa-solid fa-check" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue';
import formatDate from '@/mixins/formatDate';

export default {
    name: 'MessageSingle',
    components: {
        UserAvatar,
    },
    mixins: [formatDate],
    props: {
        message: {
            type: Object,
            required: true
        },
        withAvatar: {
            type: Boolean,
            default: true
        },
        isCurrentUser: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isHover: false,
            isEditable: false
        }
    },
}
</script>

<style scoped>

</style>