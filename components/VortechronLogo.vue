<template>
    <NuxtLink :to="this.$auth.loggedIn ? '/dashboard' : '/'">
        <img src="~/assets/vortechron-logo.svg" alt="vortsechron logo" class="h-4 sm:h-full">
    </NuxtLink>
</template>