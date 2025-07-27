<template>
    <card class="w-full relative px-4 pt-4 text-color pb-4">
        <button v-click-outside="() => {showProfile ? showProfile = false : null}"
                class="relative flex gap-2 items-center hover:bg-body hover:shadow-md cursor-pointer rounded-md max-w-min pl-1 pr-8"
                @click="showProfile = true">
            <UserAvatar class="w-8 h-8"
                        :avatar="bug.author.avatar" />
            <div>
                <div>{{ bug.author.username }}</div>
                <div class="text-xs text-zinc-400">
                    {{ bug.author.role.name }}
                </div>
            </div>
            <UserProfilePopup v-if="showProfile"
                              :user-id="bug.author.id"
                              class="left-full ml-4 top-0"
                              @close="showProfile = false" />
        </button>
        <ExtendableContent class="mb-4"
                           :content="bug.description" />
        <div v-if="bug.isProcessed">
            <text-input v-model="internalNote"
                        type="textarea"
                        label="Note interne :"
                        :row-number="4"
                        no-margin
                        @blur="internalNote !== bug.note ? update('note', internalNote) : null" />
            <div>
                Urgent :
                <input type="checkbox"
                       :checked="bug.important"
                       @change="update('important', $event.target.checked)">
            </div>
        </div>
        <div v-else-if="(bug.isArchived || bug.isDone) && bug.note"
             class="text-muted text-sm">
            <div class="font-semibold">
                Note interne
            </div>
            {{ bug.note }}
        </div>
        <hr class="w-2/3 mx-auto my-4 border-secondary">
        <div class="flex justify-between">
            <div class="w-1/3 text-xs text-zinc-400 flex items-center">
                {{ timestamp }}
            </div>
            <div class="flex gap-4 w-1/3 justify-center">
                <template v-if="bug.isProcessed">
                    <cancel-button @click="updateStatus(null)">
                        Rouvrir
                    </cancel-button>
                    <submit-button @click="updateStatus('is_done')">
                        Clôturer
                    </submit-button>
                </template>
                <cancel-button v-else-if="bug.isArchived || bug.isDone"
                               @click="updateStatus('is_processed')">
                    A traiter
                </cancel-button>
                <template v-else>
                    <submit-button @click="updateStatus('is_archived')">
                        Archiver
                    </submit-button>
                    <submit-button @click="updateStatus('is_processed')">
                        Traiter
                    </submit-button>
                </template>
            </div>
            <div class="flex gap-4 w-1/3 justify-end">
                <badge color="#38bdf8">
                    {{ bug.category.name }}
                </badge>
                <badge v-if="bug.isArchived"
                       color="#FF635B">
                    Fermé
                </badge>
                <badge v-if="bug.isDone"
                       color="#00bc7d">
                    Corrigé
                </badge>
            </div>
        </div>
    </card>
</template>

<script>
import UserProfilePopup from '@/components/user/popup/UserProfilePopup.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';
import ExtendableContent from '@/components/partials/ExtendableContent.vue';
import formatDate from '@/mixins/formatDate';
import axios from '@/axios';
import { useToast } from '@/plugins/useToast';

export default {
    name: 'BugReport',
    components: {
        UserProfilePopup,
        UserAvatar,
        ExtendableContent
    },
    mixins: [formatDate],
    props: {
        bug: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            internalNote: null,
            showProfile: false
        };
    },
    computed: {
        timestamp () {
            return this.formatTimestamp(this.bug.createdAt);
        }
    },
    mounted () {
        this.internalNote = this.bug.note;
    },
    methods: {
        updateStatus (status) {
            axios.patch(`/api/admin/bug-reports/${this.bug.id}/status`, { status }).then(() => {
                this.$emit('update-status', this.bug.id);
                const { sucessToast } = useToast();
                sucessToast('Mise à jour effectuée !');
            });
        },
        update (field, value) {
            console.log(value);
            axios.patch(`/api/admin/bug-reports/${this.bug.id}`, { [field]: value }).then(() => {
                this.$emit('update', {
                    id: this.bug.id,
                    field,
                    value
                });
                const { sucessToast } = useToast();
                sucessToast('Mise à jour effectuée !');
            });
        }
    },
};
</script>

<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
