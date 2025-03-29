<template>
    <div class="body"
         :class="{ 'dark': theme === 'dark' }">
        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapState({
            theme: state => state.parameter.theme
        })
    }
};
</script>

<style>

</style>
