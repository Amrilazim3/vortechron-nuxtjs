<template>
    <div v-if="this.$auth.loggedIn">
        <template v-if="!this.$auth.user.service">
            <template v-if="!this.$auth.user.email_verified_at">
                <div class="py-2 bg-red-200">
                    <h1 class="text-lg font-medium text-center">PLEASE VERIFIED YOUR EMAIL</h1>
                    <p class="text-sm text-center">You cannot create a post until you verify your email</p>
                    <p class="text-sm text-center">If you didn't receive email verification link, you can <button class="underline hover:text-blue-400" @click.prevent="resendEmailVerification">resend here</button></p>
                    <p class="text-sm text-center text-yellow-500" v-if="triggerResendButton">It may take a seconds, Please wait...</p>
                    <p class="text-sm text-center text-red-500" v-if="verificationResendFailed">Something went wrong, please try again later.</p>
                    <p class="text-sm text-center text-blue-500" v-if="verificationResend">Email verification link has been send! please check your email. Please try again if you do not receive it.</p>
                </div>
            </template>
            <template v-else>
                <div v-if="successVerified">
                    <div class="bg-green-400">
                        <p class="text-sm text-center">YOUR EMAIL IS VERIFIED!</p>
                    </div>
                </div>
                <div v-if="alreadyVerified">
                    <div class="bg-green-400">
                        <p class="text-sm text-center">YOUR EMAIL ALREADY VERIFIED!</p>
                    </div>
                </div>
            </template>
        </template>
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
        verificationResend: false,
        triggerResendButton: false,
        verificationResendFailed: false
    }),

    methods: {
        resendEmailVerification () {
            this.triggerResendButton = true;
            this.$axios.$post('/api/email/verify/resend', this.$auth.user)
                .then((resp) => {
                    if (resp.message) {
                        this.verificationResend = true;
                        this.triggerResendButton = false;
                    }
                })
                .catch(() => {
                    this.verificationResendFailed = true;
                })
        },

        removeSuccessVerified() {
            this.successVerified = false;
        },

        removeAlreadyVerified() {
            this.alreadyVerified = false;
        },
    }
}
</script>