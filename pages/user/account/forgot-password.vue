<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto">
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full">
            <div>
                <h3 class="text-2xl font-semibold text-center">Forgot Password</h3>
            </div>
            <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(sendLink)">
                    <keep-alive>
                        <div v-if="isLoggedIn">
                            <h2>Email</h2>
                            <p class="select-none bg-white h-8 w-full pl-2.5 py-0.5 border border-gray-400 text-gray-500 rounded-md">{{ form.email }}</p>
                        </div>
                    </keep-alive>
                    <keep-alive>
                        <ValidationProvider v-if="isLogout" tag="div" vid="email" name="Email" rules="required|email" v-slot="{ errors }" class="mt-6">
                            <h2>Email</h2>
                            <input type="email" id="email" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your email" v-model="form.email">
                            <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                        </ValidationProvider>
                    </keep-alive>
                    <div>
                        <BlueButton type="submit" id="submit" class="mt-4 w-full">Send Password Reset Link</BlueButton>
                    </div>
                </form>
            </ValidationObserver>
            <p class="mt-2 text-sm text-green-500 font-medium" v-if="isSendLink">We have sent reset password link to your email!. If you not received the link, you can try again.</p>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',

    head: {
        title: '| Forgot Password',
        meta: [
            { hid: 'description', name: 'description', content: 'Forgot Password' }
        ],
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.getUserPassword();
            this.isLoggedIn = true;
            this.isLogout = false;
            this.form.email = this.$auth.user.email;
        }
    },

    data() {
        return {
            form: {
                email: '',
            },
            isLoggedIn: false,
            isLogout: true,
            isSendLink: false,
        }
    },

    methods: {
        async sendLink() {
            this.isSendLink = false;
            let errors = [];
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            if (!this.$auth.loggedIn) {
                await this.$axios.$get('/sanctum/csrf-cookie')
            };
            await this.$axios.$post('/api/user/account/forgot-password', this.form)
                .then((resp) => {
                    this.$undisableButton(submitButton);
                    if (resp.status) {
                        this.isSendLink = true;
                    }
                })
                .catch((err) => {
                    this.$undisableButton(submitButton);
                    if (err.response.status = 422) {
                        errors = err.response.data.errors;
                        this.$refs.form.setErrors(errors);
                    }
                })
        },

        getUserPassword() {
            this.$axios.$get('/api/user/account/get-password')
                .then((resp) => {
                    this.userPassword = resp.password;
                    if (!this.userPassword) {
                        this.$router.push('/user/account/notify-set-password');
                    }
                })
        },
    },
    
}
</script>