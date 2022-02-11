<template>
    <div v-if="this.$auth.loggedIn">
        <div v-if="!this.$auth.user.email_verified_at" class="bg-red-200 py-2">
            <h1 class="text-center font-medium text-lg">PLEASE VERIFIED YOUR ACCOUNT</h1>
            <p class="text-center font-thin text-sm">You cannot create a post until you verify your email</p>
            <p class="text-center font-thin text-sm">If you didn't receive email verification link, you can <button class="underline hover:text-blue-400" @click.prevent="resendEmailVerification">resend here</button></p>
            <p class="text-center font-thin text-sm text-blue-500" v-if="verificationResend">Email verification link has been send! please check your email</p>
        </div>
        <div v-if="successVerified">
            <div class="bg-green-400">
                <p class="text-center font-thin text-sm">YOUR EMAIL IS VERIFIED!</p>
            </div>
        </div>
        <div v-if="alreadyVerified">
            <div class="bg-green-400">
                <p class="text-center font-thin text-sm">YOUR EMAIL ALREADY VERIFIED!</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    mounted() {
        if (this.$route.query.message == 'verification_success') {
            this.successVerified = true;
            setTimeout(this.removeSuccessVerified, 5000);
        } else if (this.$route.query.message == 'already_verified') {
            this.alreadyVerified = true;
            setTimeout(this.removeAlreadyVerified, 5000);
        }
    },

    data: () => ({
        successVerified: false,
        alreadyVerified: false,
        verificationResend: false
    }),

    methods: {
        resendEmailVerification () {
            this.$axios.$post('/api/email/verify/resend', this.$auth.user)
                .then((resp) => {
                    if (resp.message) {
                        this.verificationResend = true;
                    }
                    setTimeout(this.removeVerficationResend, 5000);
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        removeSuccessVerified() {
            this.successVerified = false;
        },

        removeAlreadyVerified() {
            this.alreadyVerified = false;
        },

        removeVerficationResend() {
            this.verificationResend = false;
        }
    }
}
</script>