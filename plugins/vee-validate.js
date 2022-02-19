import { required, email, min, max } from "vee-validate/dist/rules";
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

const dictionary = {
    en: {
        messages: {
            required: (field) => `The ${field} field is required.`,
            min: (field, { length }) => `The ${field} must be at least ${length} characters.`,
            max: (field, { length }) => `The ${field} must not be greater than ${length} characters.`,
            email: (field) => `The ${field} must be a valid email address.`
        },
    },
};

extend("required", required);

extend("email", email);

extend("min", min);

extend("max", max);

extend("verify_password", {
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\?@#\$%\^&\*\.\-_])(?=.{9,})");
        return strongRegex.test(value);
    },
    message: 'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc).'
});

localize(dictionary);
setInteractionMode('eager');