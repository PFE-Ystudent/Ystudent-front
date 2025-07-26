const state = {
    toasts: []
};

const createToast = ({ name, type }) => ({
  name,
  type,
  id: Math.random() * 1000,
});

const mutations = {
    addToast (state, toast_) {
        const toast = createToast(toast_);
        state.toasts.push(toast);

        setTimeout(() => {
            const index = state.toasts.findIndex((t) => t.id !== toast.id);
            state.toasts.splice(index, 1);
        }, 4000);
    },
    removeToast (state, id) {
        const index = state.toasts.findIndex((t) => t.id !== id);
        state.toasts.splice(index, 1);
    },
    removeToasts (state) {
        state.toasts.splice(0);
    }
};

export default {
    state,
    mutations
};
