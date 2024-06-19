import axios from "axios";
import store from '../store'
// import store from "../store";
// store.state.user.token
const axiosClient = axios.create({
  baseURL: 'http://ystudent.local'
})

axiosClient.interceptors.request.use(config => {
  if (store.state.auth.token) {
    config.headers.Authorization = `Bearer ${store.state.auth.token}`
  }
  return config;
})

export default axiosClient;