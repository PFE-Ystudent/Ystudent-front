import './bootstrap';
import { createApp } from 'vue'
import router from './router';
import App from './App.vue';
import Vuex from 'vuex';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

library.add(fas)

const app = createApp(App)
                .component('font-awesome-icon', FontAwesomeIcon)

app.use(Vuex)
app.use(router)
app.mount('#app')
