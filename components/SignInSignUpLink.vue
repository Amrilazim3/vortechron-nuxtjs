<template>
    <div class="space-x-4">
        <NuxtLink to="/auth/signIn" class="text-normal hover:text-blue-500" :class="{'text-blue-400' : this.$nuxt.$route.path == '/auth/signIn'}">
            Sign In
        </NuxtLink>
        <NuxtLink to="/auth/signUp" class="text-normal hover:text-blue-500" :class="{'text-blue-400' : this.$nuxt.$route.path == '/auth/signUp'}">
            Sign Up
        </NuxtLink>
    </div>
</template>