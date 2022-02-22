<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto">
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full">
            <div>
                <h3 class="text-2xl font-semibold text-center">Set Password</h3>
            </div>
            <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(setPassword)">
                    <ValidationProvider tag="div" vid="password" name="Password" rules="required|min:9|verify_password" v-slot="{ errors }" class="mt-6">
                        <h2>Password</h2>
                        <input type="password" id="password" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your own password" v-model="form.password">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="password_confirmation" name="Password confirmation" rules="required" v-slot="{ errors }" class="mt-6">
                        <h2>Password confirmation</h2>
                        <input type="password" id="password_confirmation" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your password again" v-model="form.password_confirmation">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div>
                        <BlueButton type="submit" id="submit" class="mt-4 w-full">Save</BlueButton>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',
    
    middleware: ['auth'],

    head: {
        title: '| Set Password',
        meta: [
            { hid: 'description', name: 'description', content: 'Set Password' }
        ],
    },

    data() {
        return {
            form: {
                password: '',
                password_confirmation: ''
            },
            userPassword: ''
        }
    },

    created() {
        this.checkIfPasswordExists();
    },

    methods: {
        setPassword() {
            let errors = [];
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            this.$axios.$patch('/api/user/account/set-password', this.form)
                .then(() => {
                    this.$router.push('/user/account/profile/edit-profile?message=password_set');
                })
                .catch((err) => {
                    this.$undisableButton(submitButton);
                    if (err.response.status = 422) {
                        errors = err.response.data.errors;
                        this.$refs.form.setErrors(errors);
                    }
                })
        },

        checkIfPasswordExists() {
            this.$axios.$get('/api/user/account/get-password')
                .then((resp) => {
                    this.userPassword = resp.password;
                    if (this.userPassword) {
                        this.$router.push('/user/account/profile/edit-profile');
                    }
                })
        }
    }
}
</script>