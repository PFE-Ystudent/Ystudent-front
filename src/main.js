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

const clickOutside = {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = event => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  };

const app = createApp(App)
                .component('font-awesome-icon', FontAwesomeIcon)
                .directive("click-outside", clickOutside)

app.use(Vuex)
app.use(router)
app.mount('#app')
