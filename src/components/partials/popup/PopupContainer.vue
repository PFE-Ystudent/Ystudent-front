<template>
    <div class="popup-container" @click="handleBackgroundClick">
        <transition name="popup" @after-leave="close">
            <div v-if="show" class="popup bg-secondary border border-sky-300 shadow-md rounded-md p-4">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'PopupContainer',
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
        close () {
            this.$emit('close')
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.close();
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
    padding-top: 96px;
    justify-content: center;
    overflow-y: auto;
    padding-bottom: 64px;
}

.popup {
    z-index: 999;
    min-width: 368px;
    max-width: 768px;
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