<template>
    <div class="mb-10 md:mt-20">
        <NuxtLink to="/user/account/profile/edit-profile" class="font-medium" :class="this.$nuxt.$route.path == '/user/account/profile/edit-profile' ? 'text-blue-500 underline' : ''">Edit Profile</NuxtLink>
        <br>
        <NuxtLink to="/user/account/change-password" class="font-medium" :class="this.$nuxt.$route.path == '/user/account/change-password' ? 'text-blue-500 underline' : ''">Change Password</NuxtLink>
    </div>
</template>