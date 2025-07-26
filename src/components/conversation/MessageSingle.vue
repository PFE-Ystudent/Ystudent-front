<template>
    <div class="w-full flex"
         :class="isCurrentUser ? 'justify-end' : 'justify-start'">
        <div class="flex w-4/5 gap-2"
             :class="{ 'flex-row-reverse': isCurrentUser }">
            <UserAvatar v-if="withAvatar"
                        class="w-12 h-12"
                        :avatar="message.sender.avatar" />
            <div v-else
                 class="w-12 h-12" />
            <div class="relative min-w-36 mt-2"
                 style="max-width: calc(100% - 56px)"
                 tabindex="0"
                 @mouseenter="isHover = true"
                 @mouseleave="isHover = false"
                 @focus="isFocus = true">
                <div class="p-2 rounded-b-md border"
                     :class="[isCurrentUser ? 'bg-secondary border-secondary text-color rounded-tl-md' : 'bg-primary border-primary text-white rounded-tr-md', { '!bg-selected !border-selected': isEditable }]">
                    <div ref="messageContent"
                         :contentEditable="isEditable"
                         class="outline-none whitespace-pre-wrap"
                         role="textbox"
                         aria-placeholder="Entrez votre texte d'édition"
                         @keydown="editMessageAction">
                        {{ message.content }}
                    </div>
                    <div v-if="message.post"
                         :class="{ 'mt-2': message.content }">
                        <PostSingle :post="message.post"
                                    is-details />
                    </div>
                    <div v-if="message.files && message.files.length"
                         class="flex gap-2 mt-2">
                        <a v-for="(file, i) in message.files"
                           :key="i"
                           target="_blank"
                           :href="file.path"
                           class="p-2 max-w-120 sm:max-w-40 cursor-pointer flex items-center gap-2 bg-[#2121217F] text-sm rounded-md"
                           rel="noreferrer">
                            F
                            <div class="w-4/5 text-nowrap text-ellipsis overflow-hidden">
                                {{ file.name }}
                            </div>
                        </a>
                    </div>
                    <div class="text-[10px] w-full mt-1 flex items-center"
                         :class="isCurrentUser ? 'text-color justify-start' : 'text-white justify-end'">
                        <template v-if="message.post">
                            <router-link :to="{ name: 'PostDetails', params: { id: message.post.id } }"
                                         class="hover:text-primary cursor-pointer mr-1"
                                         aria-label="Aller voir le post partagé">
                                <font-awesome-icon icon="fa-solid fa-share-from-square"
                                                   class="mx-1" />
                                <span class="underline">Post partagé</span>
                            </router-link> •
                        </template>
                        {{ formatTimestamp(message.createdAt) }}
                        <template v-if="message.isUpdated">
                            • (modifié)
                        </template>
                    </div>
                </div>
                <div v-if="(isHover || isFocus) && isCurrentUser"
                     class="absolute -bottom-2 text-white flex shadow rounded-md border right-2 bg-zinc-400">
                    <template v-if="!isEditable">
                        <button class="px-1.5 py-px hover:bg-primary cursor-pointer"
                                @click="makeEditable">
                            <font-awesome-icon icon="fa-solid fa-pen" />
                        </button>
                        <button class="px-1.5 py-px hover:bg-primary cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-reply" />
                        </button>
                        <button class="px-1.5 py-px hover:bg-primary cursor-pointer"
                                @blur="isFocus = false"
                                @click="deleteMessageAction">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </template>
                    <button v-else
                            class="px-1.5 py-px hover:bg-primary cursor-pointer"
                            @click="saveEdit"
                            @blur="isFocus = false">
                        <font-awesome-icon icon="fa-solid fa-check" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
import UserAvatar from '@/components/user/UserAvatar.vue';
import formatDate from '@/mixins/formatDate';
import PostSingle from '@/components/post/PostSingle.vue';

export default {
    name: 'MessageSingle',
    components: {
        UserAvatar,
        PostSingle
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
    data () {
        return {
            isHover: false,
            isEditable: false,
            isFocus: false
        };
    },
    methods: {
        editMessageAction (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                this.saveEdit();
            } else if (e.keyCode == 27) {
                this.$refs.messageContent.innerText = this.message.content;
                this.isEditable = false;
            }
        },
        makeEditable () {
            this.isEditable = true;
            this.$nextTick(() => this.$refs.messageContent.focus());
        },
        saveEdit () {
            this.isEditable = false;
            const content = this.$refs.messageContent.innerText;
            if (content === this.message.content) {
                return;
            }
            axios.put(`/api/messages/${this.message.id}`, { content }).then((res) => {
                    this.$emit('update', res.data.message);
                }).catch(() => {
                    // TODO: gérer l'erreur
                });
        },
        deleteMessageAction () {
            axios.delete(`/api/messages/${this.message.id}`).then(() => {
                    this.$emit('delete', this.message.id);
                }).catch(() => {
                    // TODO: gérer l'erreur
                });
        }
    }
};
</script>

<style scoped>

</style>