const state = {
    token: null,
    user: {
        id: null,
        username: null,
        email: null,
    }
};

const mutations = {
    logout(state) {
        state.token = null;
        state.user = null;
    },
    login(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user;
    }
};

export default {
    state,
    mutations
}
