import { required, email, min, max } from "vee-validate/dist/rules";
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

const dictionary = {
    en: {
        messages: {
            required: (field) => `This ${field} is required.`,
            min: (field, { length }) => `This ${field} cannot less than ${length} characters.`,
            max: (field, { length }) => `This ${field} cannot more than ${length} characters.`,
            email: (field) => `This ${field} must be a valid email address.`
        },
    },
};

extend("required", required);

extend("email", email);

extend("min", min);

extend("max", max)

localize(dictionary);
setInteractionMode('eager');