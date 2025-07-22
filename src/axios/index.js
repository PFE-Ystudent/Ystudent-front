import axiosClient from 'axios';
import store from '@/store';

const axios = axiosClient.create({
    baseURL: `http://${import.meta.env.VITE_API_HOST}`
});

axios.interceptors.request.use(config => {
    if (store.state.auth.token) {
        config.headers.Authorization = `Bearer ${store.state.auth.token}`;
    }
    return config;
});

// TODO: not working
// axios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             store.commit('logout');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axios;