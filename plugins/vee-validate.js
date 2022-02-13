import { required, email, min, max } from "vee-validate/dist/rules";
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

const dictionary = {
    en: {
        messages: {
            required: () => '* Required',
        },
    },
};

extend("required", {
    ...required,
    message: 'This field is required.'
});

extend("email", {
    ...email,
    message: 'The field must be a valid email address.'
});

extend("min", min);

extend("max", {
    ...max,
    message: 'adalah max error'
});

localize(dictionary);
setInteractionMode('eager');