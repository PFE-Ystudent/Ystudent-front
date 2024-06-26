<template>
    <BaseAuth>
        <div>
            Réseaux
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from './BaseAuth.vue';
import store from '../store';

export default {
    name: 'NetworkView',
    components: {
        BaseAuth
    },
    data () {
        return {
            user: store.state.auth.user
        }
    }
}
</script>

<style></style>
