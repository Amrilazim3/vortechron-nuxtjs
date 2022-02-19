<template>
    <section class="grid min-h-screen p-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:flex lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="hidden md:block md:mt-10 lg:self-center lg:flex-1 xl:ml-8 2xl:ml-16">
            <h1 class="text-4xl text-black font-bold md:text-center lg:text-left">
                CREATE YOUR OWN BLOG POST
            </h1>
            <p class="text-base text-blue-700 font-medium md:text-center lg:text-left">Create your account now!</p>
        </div>
        <div style="background-color: rgba(243, 243, 243, 1);" class="rounded-lg shadow-xl mt-6 lg:flex-1 lg:self-center xl:mr-8 2xl:ml-40 2xl:mr-14">
            <ValidationObserver tag="div" ref="form" v-slot="{ handleSubmit }">
                <div class="px-8 pt-8">
                    <h3 class="text-2xl font-bold mb-4">Sign up to create account</h3>
                    <p class="text-base font-normal mt-4">Sign up in with :</p>
                    <OAuthServices class="flex mt-2 space-x-4"/>
                </div>
                <form @submit.prevent="handleSubmit(signUp)" class="px-8 pb-8">
                    <div class="flex my-6">
                        <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                        <p class="text-center mx-4 text-sm">Or manually sign up</p>
                        <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                    </div>
                    <ValidationProvider tag="div" vid="name" name="Name" rules="required|min:4|max:50" v-slot="{ errors }">
                        <label for="name">Name</label>
                        <InputField type="text" id="name" v-model="form.name"/> 
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="username" name="Username" rules="required|min:4|max:15" v-slot="{ errors }">
                        <label for="username">Username</label>
                        <InputField type="text" id="username" v-model="form.username"/> 
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="email" name="Email" rules="required|email" v-slot="{ errors }">
                        <label for="email">Email</label>
                        <InputField type="email" id="email" v-model="form.email"/>
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="password" name="Password" rules="required|min:9|verify_password" v-slot="{ errors }">
                        <label for="password">Password</label>
                        <InputField type="password" id="password" v-model="form.password"/> 
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" name="Password Confirmation" rules="required" v-slot="{ errors }">
                        <label for="password_confirmation">Password confirmation</label>
                        <InputField type="password" id="password_confirmation" v-model="form.password_confirmation"/> 
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <p class="mt-2">Already sign up? <NuxtLink to="/auth/sign-in" class="text-blue-400 hover:underline">Sign in</NuxtLink> here</p>
                    <BlueButton type="submit" id="submit" class="mt-6 w-full transition duration-300">
                        Sign Up
                    </BlueButton>
                </form>
            </ValidationObserver>
        </div>
    </section>
</template>

<script>
import guest from '../../middleware/guest'

export default {

    layout: 'hide-subnav',
    
    middleware: [guest],

    head: {
        title: '| Sign Up',
        meta: [
            { hid: 'description', name: 'description', content: 'Sign in page' }
        ],
    },

    data: () => ({
        form: {
            name: '',
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        errors: []
    }),

    methods: {
        async signUp() {
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            try {
                let errors = []
                await this.$axios.$get('/sanctum/csrf-cookie')
                await this.$axios.$post('/api/sign-up', this.form)
                    .then(() => {
                        this.$auth.loginWith('laravelSanctum', { data: this.form })
                    })
                    .catch((err) => {
                        this.$undisableButton(submitButton);
                        if (err.response.status = 422) {
                            errors = err.response.data.errors;
                            this.$refs.form.setErrors(errors);
                        }
                    })
            } catch (error) {}
        }
    }

}
</script>