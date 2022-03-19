<template>
    <div class="mb-10 md:mt-20">
        <NuxtLink to="/user/account/profile/edit-profile" class="font-medium" :class="this.$nuxt.$route.path == '/user/account/profile/edit-profile' ? 'text-blue-500' : ''">Edit Profile</NuxtLink>
        <br>
        <NuxtLink to="/user/account/change-password" class="font-medium" :class="this.$nuxt.$route.path == '/user/account/change-password' ? 'text-blue-500' : ''">Change Password</NuxtLink>
        <br>
        <button class="mt-4 font-medium text-red-500 hover:underline" @click="signOut">sign out</button>
    </div>
</template>

<script>
export default {
    methods: {
        signOut() {
            this.$auth.logout();
        }
    }
}
</script>