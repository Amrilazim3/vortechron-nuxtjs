<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto">
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full">
            <div>
                <h3 class="text-2xl font-semibold text-center">Change Email</h3>
            </div>
            <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit, untouched }">
                <form @submit.prevent="handleSubmit(changeEmail)">
                    <div class="mt-6">
                        <h2>Current Email</h2>
                        <p class="select-none bg-white h-8 w-full pl-2.5 py-0.5 border border-gray-400 text-gray-500 rounded-md">{{ currentEmail }}</p>
                    </div>
                    <ValidationProvider tag="div" vid="email" name="Email" rules="required|email" v-slot="{ errors }" class="mt-6">
                        <h2>New Email</h2>
                        <input type="email" id="email" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your new email" v-model="form.email">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="password" name="Password" rules="required" v-slot="{ errors }" class="mt-6">
                        <h2>Password</h2>
                        <input type="password" id="password" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your password" v-model="form.password">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <NuxtLink to="/user/account/forgot-password" class="text-blue-400 hover:underline">Forgot password?</NuxtLink>
                    <div>
                        <BlueButton type="submit" id="submit" class="mt-4 w-full">Save</BlueButton>
                    </div>
                    <p class="text-sm text-red-500 mt-2" :class="{ 'hidden' : untouched }">Notice : we will send email verification to your new email. Plase make sure your new email is correct</p>
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
        title: '| Change Email',
        meta: [
            { hid: 'description', name: 'description', content: 'Change Email' }
        ],
    },

    mounted() {
        this.user = JSON.parse(JSON.stringify(this.$auth.user));
    },

    data() {
        return {
            currentEmail: this.$auth.user.email,
            form: {
                email: '',
                password: ''
            },
            user: {}
        }
    },

    methods: {
        changeEmail() {
            let errors = [];
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            this.$axios.$post('/api/user/account/profile/change-email', this.form)
                .then(() => {
                    this.user.email = this.form.email;
                    this.user.email_verified_at = null;
                    this.$auth.setUser(this.user);
                    this.$router.push('/user/account/profile/edit-profile');
                })
                .catch((err) => {
                    this.$undisableButton(submitButton);
                    if (err.response.status = 422) {
                        errors = err.response.data.errors;
                        this.$refs.form.setErrors(errors);
                    }
                })
        },
    }
}
</script>