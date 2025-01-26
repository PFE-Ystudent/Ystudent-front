<template>
    <PopupContainer @close="close">
        <div class="text-xl font-semibold mb-2">Confirmation</div>
        <hr class="mb-2">
        <slot>
            Êtes-vous sûr de vouloir faire cette action ?
        </slot>
        <div class="mt-8 flex gap-4 justify-end">
            <cancel-button @click="close">
                Annuler
            </cancel-button>
            <submit-button @click="confirm">
                Confirmer
            </submit-button>
        </div>
    </PopupContainer>
</template>

<script>
import PopupContainer from '@/components/partials/popup/PopupContainer.vue';

export default {
    name: 'ConfirmPopup',
    components: {
        PopupContainer
    },
    methods: {
        close () {
            this.$emit('close');
        },
        confirm () {
            this.$emit('confirm');
            this.close();
        }
    }
};
</script>

<style scoped>

</style>