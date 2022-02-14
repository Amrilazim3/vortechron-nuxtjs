import { required, email, min, max } from "vee-validate/dist/rules";
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

const dictionary = {
    en: {
        messages: {
            required: (field) => `The ${field} field is required.`,
            min: (field, { length }) => `The ${field} ust be at least ${length} characters.`,
            max: (field, { length }) => `The ${field} must not be greater than ${length} characters.`,
            email: (field) => `The ${field} must be a valid email address.`
        },
    },
};

extend("required", required);

extend("email", email);

extend("min", min);

extend("max", max)

localize(dictionary);
setInteractionMode('eager');