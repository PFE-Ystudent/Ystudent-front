import axiosClient from "axios";
import store from '@/store'
import router from '@/router';

const axios = axiosClient.create({
    baseURL: 'http://localhost:8000'
})

axios.interceptors.request.use(config => {
    if (store.state.auth.token) {
        config.headers.Authorization = `Bearer ${store.state.auth.token}`
    }
    return config;
})

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            store.commit('logout');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default axios;