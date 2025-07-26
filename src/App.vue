<template>
    <div class="body"
         :class="{ 'dark': theme === 'dark' }">
        <router-view />
        <ToastContainer />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ToastContainer from './components/partials/ToastContainer.vue';

export default {
    name: 'App',
    components: {
        ToastContainer
    },
    computed: {
        ...mapState({
            theme: state => state.parameter.theme
        })
    }
};
</script>

<style>

</style>
