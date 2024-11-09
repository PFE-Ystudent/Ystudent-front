<template>
    <div class="popup-container" @click="handleBackgroundClick">
        <transition name="popup" @after-leave="$emit('close')">
            <div v-if="show" class="popup bg-zinc-50 border border-sky-300 shadow-md rounded-md p-4">
                <div class="text-xl font-semibold mb-2">Confirmation</div>
                <hr class="mb-2">
                <template v-if="$slots.hasOwnProperty('default')">
                    <slot></slot>
                </template>
                <template v-else>
                    Êtes-vous sûr de vouloir faire cette action ?
                </template>
                <div class="mt-8 flex gap-4 justify-end">
                    <cancel-button @click="close">
                        Annuler
                    </cancel-button>
                    <submit-button @click="confirm">
                        Confirmer
                    </submit-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ConfirmPopup',
    data() {
        return {
            show: false
        };
    },
    mounted() {
        this.show = true
        document.body.classList.add('no-scroll-in-popup');
        document.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        document.body.classList.remove('no-scroll-in-popup');
        document.removeEventListener('keydown', this.handleKeydown);
    },
    methods: {
        close() {
            this.show = false;
        },
        confirm () {
            this.$emit('confirm');
            this.close();
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.close();
            } else if (!event.ctrlKey && !event.altKey && !event.shiftKey && (event.keyCode < 112 || event.keyCode > 123)) {
                event.preventDefault();
            }
        },
        handleBackgroundClick(event) {
            if (event.target === event.currentTarget) {
                this.close();
            }
        }
    }
};
</script>

<style scoped>
.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: #00000050;
    display: flex;
    align-items: start;
    padding-top: 10%;
    justify-content: center;
}

.popup {
    z-index: 999;
    background-color: #f9f9f9;
    min-width: 368px;
    max-width: 512px;
    user-select: text;
}

.popup-enter-active, .popup-leave-active {
  transition: transform 0.4s, opacity 0.3s ease-in;
}
.popup-enter-from, .popup-leave-to {
    transform: translateY(-200%);
    opacity: 0;
}
.popup-enter-to {
    opacity: 1;
}
</style>

<style>
.no-scroll-in-popup {
    overflow: hidden;
    user-select: none;
}
</style>