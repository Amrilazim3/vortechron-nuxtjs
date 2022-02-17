<template>
    <section class="grid min-h-screen p-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:flex lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="hidden md:block md:mt-10 lg:self-center lg:flex-1 xl:ml-8 2xl:ml-16">
            <h1 class="text-4xl text-black font-bold md:text-center lg:text-left">
                WELCOME BACK
            </h1>
            <p class="text-base text-blue-700 font-medium md:text-center lg:text-left">Continue exploring endlessly</p>
        </div>
        <div style="background-color: rgba(243, 243, 243, 1);" class="rounded-lg shadow-xl mt-6 lg:flex-1 lg:self-center xl:mr-8 2xl:ml-40 2xl:mr-14">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(signIn)" class="p-8">
                    <h3 class="text-2xl font-bold">Sign in to your account</h3>
                    <p class="text-base font-normal mt-4">Sign in with :</p>
                    <OAuthServices class="flex mt-2 space-x-4"/>
                    <div class="flex my-6">
                        <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                        <p class="text-center mx-4 text-sm">Or manually sign in</p>
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
                    <p class="mt-2">Don't have account? <NuxtLink to="/auth/sign-up" class="text-blue-400 hover:underline">Sign up</NuxtLink> here</p>
                    <BlueButton type="submit" id="submit" class="mt-6 w-full transition duration-300">
                        Sign In
                    </BlueButton>
                </form>
            </ValidationObserver>
        </div>
    </section>
</template>

<script>
import guest from '../../middleware/guest'

export default {

    middleware: [guest],

    head: {
        title: '| Sign In',
        meta: [
            { hid: 'description', name: 'description', content: 'Login page' }
        ],
    },

    data: () => ({
        form: {
            email: '',
            password: '',
        },
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