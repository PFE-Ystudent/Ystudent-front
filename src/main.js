import './bootstrap';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import CancelButton from '@/components/partials/input/CancelButton.vue';
import SubmitButton from '@/components/partials/input/SubmitButton.vue';
import TextInput from '@/components/partials/input/TextInput.vue';
import SelectInput from '@/components/partials/input/SelectInput.vue';
import UploadInput from '@/components/partials/input/UploadInput.vue';
import CardComponent from '@/components/container/CardComponent.vue';
import UserSelectInput from '@/components/partials/input/UserSelectInput.vue';
import store from '@/store';
import TextBadge from '@/components/partials/TextBadge.vue';

library.add(fas);

const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: el => {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('cancel-button', CancelButton)
    .component('submit-button', SubmitButton)
    .component('text-input', TextInput)
    .component('select-input', SelectInput)
    .component('user-select-input', UserSelectInput)
    .component('upload-input', UploadInput)
    .component('card', CardComponent)
    .component('badge', TextBadge)
    .directive('click-outside', clickOutside);

app.use(store);
app.use(router);
app.mount('#app');
