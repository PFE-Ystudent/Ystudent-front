import { beforeEach, afterEach } from 'vitest';
import { config } from '@vue/test-utils';
import SubmitButton from '@/components/partials/input/SubmitButton.vue';
import TextInput from '@/components/partials/input/TextInput.vue';
import SelectInput from '@/components/partials/input/SelectInput.vue';
import UploadInput from '@/components/partials/input/UploadInput.vue';
import CancelButton from '@/components/partials/input/CancelButton.vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.global.components = {
    TextInput,
    SubmitButton,
    SelectInput,
    UploadInput,
    CancelButton
};

config.global.stubs = {
    'font-awesome-icon': true,
};

beforeEach(() => {
    //
});

afterEach(() => {
    //
});
