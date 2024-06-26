<template>
    <BaseAuth>
        <div>
            Poste
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from './BaseAuth.vue';
import store from '../store';

export default {
    name: 'PostView',
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
