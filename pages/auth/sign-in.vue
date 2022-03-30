<template>
    <section class="min-h-screen p-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:flex lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="block md:mt-10 lg:self-center lg:flex-1 xl:ml-8 2xl:ml-16">
            <h1 class="text-4xl font-bold text-black md:text-center lg:text-left">
                WELCOME BACK
            </h1>
            <p class="text-base font-medium text-blue-700 md:text-center lg:text-left">Continue exploring endlessly</p>
        </div>
        <div style="background-color: rgba(243, 243, 243, 1);" class="mt-6 rounded-lg shadow-xl lg:flex-1 lg:self-center xl:mr-8 2xl:ml-40 2xl:mr-14">
            <ValidationObserver tag="div" ref="form" v-slot="{ handleSubmit }">
                <div class="px-8 pt-8">
                    <h3 class="text-2xl font-bold">Sign in to your account</h3>
                    <p class="mt-4 text-base font-normal">Sign in with :</p>
                    <OAuthServices class="flex mt-2 space-x-4"/>
                </div>
                <form @submit.prevent="handleSubmit(signIn)" class="px-8 pb-8">
                    <div class="flex my-6">
                        <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                        <p class="mx-4 text-sm text-center">Or manually sign in</p>
                        <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                    </div>
                    <ValidationProvider tag="div" vid="email" name="Email" rules="required|email" v-slot="{ errors }">
                        <label for="email">Email</label>
                        <InputField type="email" id="email" v-model="form.email"/>
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider tag="div" vid="password" name="Password" rules="required" v-slot="{ errors }">
                        <label for="password">Password</label>
                        <InputField type="password" id="password" v-model="form.password"/>
                        <p class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <NuxtLink to="/user/account/forgot-password" class="text-blue-400 hover:underline">Forgot password?</NuxtLink>
                    <p class="mt-2">Don't have account? <NuxtLink to="/auth/sign-up" class="text-blue-400 hover:underline">Sign up</NuxtLink> here</p>
                    <BlueButton type="submit" id="submit" class="w-full mt-6 transition duration-300">
                        Sign In
                    </BlueButton>
                    <p class="mt-2 text-sm font-medium text-green-500" v-if="resetPasswordMessage">You succesfully reset your password, please sign in.</p>
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
        title: '| Sign In',
        meta: [
            { hid: 'description', name: 'description', content: 'Login page' }
        ],
    },

    mounted() {
        if (this.$route.query.message == 'reset_password_success') {
            this.resetPasswordMessage = true;
        }
    },

    data: () => ({
        form: {
            email: '',
            password: '',
        },
        resetPasswordMessage: false
    }),

    methods: {
        async signIn() {
            let submitButton = document.getElementById('submit');
            this.$disableButton(submitButton);
            submitButton.disabled = true;
            submitButton.classList.add('bg-blue-800');
            submitButton.classList.add('cursor-not-allowed');
            try {
                await this.$auth.loginWith('laravelSanctum', { data: this.form })
                    .then(() => {
                        if (this.resetPasswordMessage) {
                            this.$router.push('/dashboard');
                            return
                        }
                        this.$router.back();
                    })
            } catch (err) {
                this.$undisableButton(submitButton);
                if (err.response.status = 422) {
                    this.$refs.form.setErrors({
                        password: ['Could not sign yout in with those credentials.']
                    });
                }
            }
        }
    }
}
</script>