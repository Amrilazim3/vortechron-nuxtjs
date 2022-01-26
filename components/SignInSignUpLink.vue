<template>
    <div class="space-x-4">
        <NuxtLink to="/auth/sign-in" class="text-normal hover:text-blue-500" :class="{'text-blue-400' : this.$nuxt.$route.path == '/auth/sign-in'}">
            Sign In
        </NuxtLink>
        <NuxtLink to="/auth/sign-up" class="text-normal hover:text-blue-500" :class="{'text-blue-400' : this.$nuxt.$route.path == '/auth/sign-up'}">
            Sign Up
        </NuxtLink>
    </div>
</template>