const state = {
    token: null,
    user: {
        id: null,
        username: null,
        email: null,
        role: {
            id: null,
            name: null
        },
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

const getters = {
    isAdmin: (state) => {
        return state.user?.role?.id === 1;
    }
};

export default {
    state,
    mutations,
    getters
}
