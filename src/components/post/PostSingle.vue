<template>
    <card class="w-full relative px-4 pt-4 text-color"
          :class="isDetails ? 'pb-4' : 'pb-2'"
          tabindex="0"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
          @focus="isFocus = true">
        <TooltipAction v-if="!isDetails"
                       :actions="actions"
                       :is-hover="isHover || isFocus"
                       class="absolute top-0 right-0 text-sky-400 cursor-pointer"
                       @select-action="selectAction"
                       @blur="isFocus = false">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"
                               class="p-4" />
        </TooltipAction>
        <button v-click-outside="() => {showProfile ? showProfile = false : null}"
                class="relative flex gap-2 items-center hover:bg-body hover:shadow-md cursor-pointer rounded-md max-w-min pl-1 pr-8"
                @click="showProfile = true">
            <UserAvatar class="w-8 h-8"
                        :avatar="post.author.avatar" />
            <div>
                <div>{{ post.author.username }}</div>
                <div class="text-xs text-zinc-400">
                    {{ post.author.role.name }}
                </div>
            </div>
            <UserProfilePopup v-if="showProfile"
                              :user-id="post.author.id"
                              class="left-full ml-4"
                              :class="{ 'top-0': isDetails }"
                              @close="showProfile = false" />
        </button>
        <div class="text-xl font-semibold my-2">
            {{ post.title }}
        </div>
        <ExtendableContent class="mb-4"
                           :content="post.content" />
        <div v-if="post.surveys.length"
             class="flex flex-col gap-4 mb-4">
            <PostSurvey v-for="survey in post.surveys"
                        :key="survey.id"
                        :survey="survey"
                        @update-survey="updateSurvey" />
        </div>
        <PostFiles v-if="post.files.length"
                   :files="post.files"
                   class="mb-4" />
        <div class="mb-4 flex justify-end gap-4">
            <badge v-for="category in post.categories"
                   :key="category.id"
                   color="#38bdf8">
                <font-awesome-icon icon="fa-solid fa-hashtag"
                                   size="sm" />
                {{ category.name }}
            </badge>
        </div>
        <template v-if="!isDetails">
            <hr class="w-2/3 mx-auto mb-2 border-secondary">
            <div class="flex justify-end">
                <div class="w-1/2 md:w-1/3 text-xs text-zinc-400 flex items-center">
                    {{ timestamp }}<div v-if="post.isEdited"
                                        class="font-semibold ml-1">
                        • (modifié)
                    </div>
                </div>
                <div v-if="isDesktop"
                     class="w-1/3 flex justify-center gap-4">
                    <badge color="#00bc7d"
                           clickable
                           aria-haspopup="true"
                           @click="$emit('share')">
                        <font-awesome-icon icon="fa-solid fa-share-from-square" />
                        Partager
                    </badge>
                    <badge color="#8e51ff">
                        <font-awesome-icon icon="fa-solid fa-reply" />
                        {{ post.replyCount ?? 0 }} Réponse{{ post.replyCount && post.replyCount > 1 ? 's' : '' }}
                    </badge>
                    <badge v-if="post.isFavorited"
                           color="#fbbf24">
                        <font-awesome-icon icon="fa-solid fa-star" />
                        Favoris
                    </badge>
                </div>
                <div class="w-1/2 md:w-1/3 flex justify-end">
                    <cancel-button @click="$router.push({ name: 'PostDetails', params: { id: post.id } })">
                        <div class="flex gap-4 items-center">
                            <div class="mb-px">
                                Voir
                            </div>
                            <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
                        </div>
                    </cancel-button>
                </div>
            </div>
        </template>
        <div v-else
             class="text-xs text-zinc-400 pt-2 flex">
            {{ timestamp }}<div v-if="post.isEdited"
                                class="font-semibold ml-1">
                • (modifié)
            </div>
        </div>
    </card>
</template>

<script>
import store from '@/store';
import TooltipAction from '@/components/partials/TooltipAction.vue';
import PostSurvey from '@/components/post/integrations/PostSurvey.vue';
import UserProfilePopup from '@/components/user/popup/UserProfilePopup.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';
import ExtendableContent from '@/components/partials/ExtendableContent.vue';
import formatDate from '@/mixins/formatDate';
import axios from '@/axios';
import PostFiles from '@/components/post/PostFiles.vue';

export default {
    name: 'PostSingle',
    components: {
        TooltipAction,
        PostSurvey,
        UserProfilePopup,
        UserAvatar,
        ExtendableContent,
        PostFiles
    },
    mixins: [formatDate],
    props: {
        post: {
            type: Object,
            required: true
        },
        isDetails: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            user: store.state.auth.user,
            isHover: false,
            isFocus: false,
            showProfile: false,
            isDesktop: window.innerWidth >= 768
        };
    },
    computed: {
        actions () {
            if (this.post.author.id === this.user.id) {
                return [
                    { value: 'edit', label: 'Modifier' },
                    { value: 'delete', label: 'Supprimer' },
                ];
            }
            return [
                { value: 'favorite', label: this.post.isFavorited ? 'Retirer des favoris' : 'Ajouter au favoris' },
                { value: 'report', label: 'Signaler' },
            ];
        },
        timestamp () {
            return this.formatTimestamp(this.post.createdAt);
        }
    },
    methods: {
        updateSurvey (survey) {
            const surveys = [...this.post.surveys];
            const surveyIndex = surveys.findIndex(s => s.id === survey.id);
            surveys[surveyIndex] = survey;

            this.$emit('update', {
                postId: this.post.id,
                field: 'surveys',
                value: surveys
            });
        },
        selectAction (action) {
            if (action === 'delete') {
                this.$emit('delete-post', this.post.id);
            } else if (action === 'edit') {
                this.$emit('edit-post', this.post.id);
            } else if (action === 'favorite') {
                axios.post(`/api/posts/${this.post.id}/favorite`).then(() => {
                    this.$emit('update', {
                        postId: this.post.id,
                        field: 'isFavorited',
                        value: !this.post.isFavorited
                    });
                });
            }
        }
    }
};
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
