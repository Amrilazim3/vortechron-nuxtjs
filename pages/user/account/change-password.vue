<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:flex md:justify-around md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <ProfileSideBarNav />
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full lg:w-2/3">
            <div>
                <h3 class="text-2xl font-semibold">Change Password</h3>
                <p class="text-sm">Secure your security information</p>
            </div>
            <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(changePassword)">
                    <ValidationProvider tag="div" vid="old_password" name="Old password" rules="required" v-slot="{ errors }" class="mt-6">
                        <h2>Old password</h2>
                        <input type="password" id="old_password" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your old password" v-model="form.old_password">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <NuxtLink to="/user/account/forgot-password" class="text-blue-400 hover:underline">Forgot password?</NuxtLink>
                    <ValidationProvider tag="div" vid="new_password" name="New password" rules="required|min:9|verify_password" v-slot="{ errors }" class="mt-4">
                        <h2>New password</h2>
                        <input type="password" id="new_password" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your new password" v-model="form.new_password">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="new_password_confirmation" name="New password confirmation" rules="required" v-slot="{ errors }" class="mt-6">
                        <h2>New password confirmation</h2>
                        <input type="password" id="new_password_confirmation" class="bg-white h-8 w-full pl-2.5 border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none" placeholder="Enter your new password confirmation" v-model="form.new_password_confirmation">
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div>
                        <BlueButton type="submit" id="submit" class="mt-4 w-full">Save</BlueButton>
                    </div>
                    <p class="mt-2 text-sm text-green-500 font-medium hidden" id="password_changed_message">Your new password has been set.</p>
                </form>
            </ValidationObserver>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',
    
    middleware: 'auth',

    head: {
        title: '| Change Password',
        meta: [
            { hid: 'description', name: 'description', content: 'Change Password' }
        ],
    },

    data() {
        return {
            form: {
                old_password: '',
                new_password: '',
                new_password_confirmation: ''
            },
            userPassword: '',
        }
    },

    created() {
        this.getUserPassword();
    },

    methods: {
        changePassword() {
            let errors = [];
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            this.$axios.$patch('/api/user/account/change-password', this.form)
                .then(() => {
                    this.$undisableButton(submitButton);

                    let successMessage = document.getElementById('password_changed_message');
                    successMessage.classList.remove('hidden');
                    
                    this.form.old_password = '';
                    this.form.new_password = '';
                    this.form.new_password_confirmation = '';
                    this.$refs.form.reset();

                    setTimeout(function () {
                        successMessage.classList.add('hidden');
                    },3500);
                })
                .catch((err) => {
                    this.$undisableButton(submitButton);
                    if (err.response.status == 422) {
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
    }
}
</script>