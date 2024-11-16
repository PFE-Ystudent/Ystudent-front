import axiosClient from "axios";
import store from '@/store'
// import store from "../store";
// store.state.user.token
const axios = axiosClient.create({
  baseURL: 'http://localhost:8000'
})

axios.interceptors.request.use(config => {
  if (store.state.auth.token) {
    config.headers.Authorization = `Bearer ${store.state.auth.token}`
  }
  return config;
})

export default axios;