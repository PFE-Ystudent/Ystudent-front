import './bootstrap';
import { createApp } from 'vue'
import router from './router';
import App from './App.vue';
import Vuex from 'vuex';

const app = createApp(App)

app.use(Vuex)
app.use(router)
app.mount('#app')
