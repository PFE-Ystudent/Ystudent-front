import './bootstrap';
import { createApp } from 'vue'
import router from './router';
import App from './App.vue';
import Vuex from 'vuex';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import CancelButton from '@/components/partials/input/CancelButton.vue';
import SubmitButton from '@/components/partials/input/SubmitButton.vue';
import TextInput from '@/components/partials/input/TextInput.vue';
import SelectInput from '@/components/partials/input/SelectInput.vue';
import UploadInput from '@/components/partials/input/UploadInput.vue';


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
                .component('cancel-button', CancelButton)
                .component('submit-button', SubmitButton)
                .component('text-input', TextInput)
                .component('select-input', SelectInput)
                .component('upload-input', UploadInput)
                .directive("click-outside", clickOutside)

app.use(Vuex)
app.use(router)
app.mount('#app')
