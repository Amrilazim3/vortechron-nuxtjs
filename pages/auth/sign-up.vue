<template>
    <section class="grid p-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:flex lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="hidden md:block md:mt-10 lg:self-center lg:flex-1 xl:ml-8 2xl:ml-16">
            <h1 class="text-4xl text-black font-bold md:text-center lg:text-left">
                CREATE YOUR OWN BLOG POST
            </h1>
            <p class="text-base text-blue-700 font-medium md:text-center lg:text-left">Create your account now!</p>
        </div>
        <div style="background-color: rgba(243, 243, 243, 1);" class="rounded-lg shadow-xl mt-6 lg:flex-1 xl:mr-8 2xl:ml-40 2xl:mr-14">
            <form @submit.prevent="signUp" class="p-8">
                <h3 class="text-2xl font-bold mb-4">Sign up to create account</h3>
                <p class="text-base font-normal mt-4">Sign up in with :</p>
                <OAuthServices class="flex mt-2 space-x-4"/>
                <div class="flex my-6">
                    <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                    <p class="text-center mx-4 text-sm">Or manually sign up</p>
                    <div class="bg-gray-300 h-0.5 flex-1 self-center"></div>
                </div>
                <div>
                    <label for="name">Name</label>
                    <Input type="text" id="name" v-model="form.name" required/> 
                    <p v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</p>
                </div>
                <div>
                    <label for="username">Username</label>
                    <Input type="text" id="username" v-model="form.username" required/> 
                    <p v-if="errors.username" class="text-red-500">{{ errors.username[0] }}</p>
                </div>
                <div>
                    <label for="email">Email</label>
                    <Input type="email" id="email" v-model="form.email" required/> 
                    <p v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</p>
                </div>
                <div>
                    <label for="password">Password</label>
                    <Input type="password" id="password" v-model="form.password" required/> 
                </div>
                <div>
                    <label for="password_confirmation">Password confirmation</label>
                    <Input type="password" id="password_confirmation" v-model="form.password_confirmation" required/> 
                    <p v-if="errors.password" class="text-red-500">{{ errors.password[0] }}</p>
                </div>
                <p class="mt-2">Already sign up? <NuxtLink to="/auth/sign-in" class="text-blue-400 hover:underline">Sign in</NuxtLink> here</p>
                <BlueButton type="submit" class="mt-6 w-full transition duration-300">
                    Sign Up
                </BlueButton>
            </form>
        </div>
    </section>
</template>

<script>
import guest from '../../middleware/guest'

export default {
    
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
            try {
                let errors = []
                await this.$axios.$get('/sanctum/csrf-cookie')
                await this.$axios.$post('/api/sign-up', this.form)
                    .then(() => {
                        this.$auth.loginWith('laravelSanctum', { data: this.form })
                    })
                    .catch((err) => {
                        if (err.response.status = 422) {
                            errors = err.response.data.errors
                        }
                    })
                    this.errors = errors
            } catch (error) {}
        }
    }

}
</script>