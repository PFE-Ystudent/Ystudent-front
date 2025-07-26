import Vuex from 'vuex';
import auth from './modules/auth';
import parameter from './modules/parameter';
import createPersistedState from 'vuex-persistedstate';
import toast from './modules/toast';

const store = new Vuex.Store({
    modules: {
        auth,
        parameter,
        toast
    },
    plugins: [createPersistedState()]
});

export default store;
