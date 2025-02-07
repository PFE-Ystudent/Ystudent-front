import Vuex from 'vuex'
import auth from './modules/auth'
import parameter from './modules/parameter';
import createPersistedState from "vuex-persistedstate";



const store = new Vuex.Store({
    modules: {
        auth,
        parameter,
    },
    plugins: [createPersistedState()]
});

export default store
