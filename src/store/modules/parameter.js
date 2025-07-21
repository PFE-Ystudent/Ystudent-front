const state = {
    theme: localStorage.getItem('theme')
};

const mutations = {
    switchTheme (state) {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', state.theme);
    }
};

export default {
    state,
    mutations
};
