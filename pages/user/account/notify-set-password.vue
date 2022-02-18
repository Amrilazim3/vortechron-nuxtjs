<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto">
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full">
            <div>
                <h3 class="text-2xl font-semibold">You are currently signed in using social service and you don't have a password set in this application</h3>
                <p class="text-lg mt-6">Set your own password and gain some functionality :</p>
                <li class="list-disc text-base my-1.5">Surf this website using your social service account while still having own password for this application.</li>
                <li class="list-disc text-base my-1.5">You can manually sign in with your social service email and your own created password.</li>
                <li class="list-disc text-base my-1.5">Can perform changing password for security purpose.</li>
                <li class="list-disc text-base my-1.5">Secure your account more in this application.</li>
            </div>
            <p class="text-lg mt-6">Do you want to set your own password?</p>
            <div class="w-full mt-2 flex">
                <button class="flex-1 py-1.5 rounded-l-md bg-blue-500 hover:bg-blue-600" @click.prevent="yesSelected">Yes</button>
                <button class="flex-1 py-1.5 rounded-r-md bg-red-500 hover:bg-red-600" @click.prevent="noSelected">No</button>      
            </div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',
    
    middleware: ['auth'],

    head: {
        title: '| Set Password Notice',
        meta: [
            { hid: 'description', name: 'description', content: 'Set Password Notice' }
        ],
    },

    methods: {
        yesSelected() {
            this.$router.push('/user/account/set-password');
        },

        noSelected() {
            this.$router.push('/user/account/profile/edit-profile');        }
        }
}
</script>