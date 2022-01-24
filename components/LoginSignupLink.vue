<template>
    <div class="space-x-4">
        <NuxtLink to="/auth/login" class="text-normal hover:text-blue-500" :class="{'text-blue-400' : this.$nuxt.$route.path == '/auth/login'}">
            LOG IN
        </NuxtLink>
        <NuxtLink to="/auth/signup" class="text-normal hover:text-blue-500" :class="{'text-blue-400' : this.$nuxt.$route.path == '/auth/signup'}">
            SIGN UP
        </NuxtLink>
    </div>
</template>