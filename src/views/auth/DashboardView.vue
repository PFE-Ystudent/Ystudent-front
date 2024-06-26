<template>
    <BaseAuth>
        <div>
            <div className="mt-4 border-sky-400 border-l-4">
                <div className="text-3xl pl-2 border-sky-300 border-l-4">
                Bienvenue <span className="font-semibold text-sky-300">{{ user.username }}</span>
                </div>
            </div>
            <div className="mb-8">
                Les activités récentes qui pourraient vous intéresser
            </div>
        </div>
    </BaseAuth>
</template>

<script>
import BaseAuth from '../BaseAuth.vue';
import store from '../../store';

export default {
    name: 'DashboardView',
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
