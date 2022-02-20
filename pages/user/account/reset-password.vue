<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto">
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full">
            <div>
                <h3 class="text-2xl font-semibold text-center">Reset Password</h3>
            </div>
            <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(resetPassword)">
                    <div class="mt-6">
                        <h2>Email</h2>
                        <p class="select-none bg-white h-8 w-full pl-2.5 py-0.5 border border-gray-400 text-gray-500 rounded-md">{{ form.email }}</p>
                    </div>
                    <ValidationProvider tag="div" vid="password" name="New password" rules="required|verify_password" v-slot="{ errors }" class="mt-6">
                        <h2>New Password</h2>
                        <input type="password" id="password" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your new password" v-model="form.password">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="password_confirmation" name="New password confirmation" rules="required" v-slot="{ errors }" class="mt-6">
                        <h2>New Password Confirmation</h2>
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

    head: {
        title: '| Reset Password',
        meta: [
            { hid: 'description', name: 'description', content: 'Reset Password' }
        ],
    },

    mounted() {
        if (this.$route.query.email) {
            this.form.email = this.$route.query.email;
            this.form.token = this.$route.query.token;
        } else {
            if (this.$auth.loggedIn) {
                this.$router.push('/user/account/profile/edit-profile');
            } else {
                this.$router.push('/auth/sign-in');
            }
        }
    },

    data() {
        return {
            form: {
                token: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
        }
    },

    methods: {
        resetPassword() {
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            let errors = []
            this.$axios.$post('api/user/account/reset-password', this.form)
                .then(async () => {
                    if (this.$auth.loggedIn) {
                        await this.$auth.logout()
                            .then(() => {
                                this.$router.push('/auth/sign-in?message=reset_password_success');
                            });
                    } else {
                        this.$router.push('/auth/sign-in?message=reset_password_success');
                    } 
                })
                .catch((err) => {
                    this.$undisableButton(submitButton);
                    if (err.response.status = 422) {
                        errors = err.response.data.errors;
                        this.$refs.form.setErrors(errors);
                    }
                });
        },

        waitForSeconds() {
            setTimeout(function() {
                console.log('wait for sec');
            }, 3500)
        }
    }
}
</script>