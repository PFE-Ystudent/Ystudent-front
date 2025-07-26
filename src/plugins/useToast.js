import store from '@/store';

export function useToast () {
    const sucessToast = (name) => {
        store.commit('addToast', { name, type: 'sucess' });
    };

    const errorToast = (name) => {
        store.commit('addToast', { name, type: 'error' });
    };

    return {
        sucessToast,
        errorToast
    };
}
