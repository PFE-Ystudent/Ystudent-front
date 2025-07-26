<template>
    <div class="fixed right-3 bottom-3 flex flex-col gap-3">
        <TextToast v-for="(toast, index) in toasts"
                   :key="index"
                   :type="toast.type"
                   @close="removeToast(toast.id)">
            {{ toast.name }}
        </TextToast>
    </div>
</template>

<script>
import store from '@/store';
import TextToast from './TextToast.vue';

export default {
    name: 'ToastContainer',
    components: {
        TextToast
    },
    data () {
        return {
            toasts: store.state.toast.toasts
        };
    },
    mounted () {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeUnmount () {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    methods: {
        removeToast (id) {
            store.commit('removeToast', id);
        },
        handleBeforeUnload () {
            store.commit('removeToasts');
        }
    }
};
</script>
