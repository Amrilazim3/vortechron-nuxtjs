<template>
    <ul class="inline-block xl:flex xl:ml-8 xl:space-x-8">
        <NuxtLink 
            to="/information/about"
            :class="{'font-bold' : this.$nuxt.$route.path == '/information/about'}"
        >
            <li class="hover:text-gray-500 block">About us</li>
        </NuxtLink>
        <NuxtLink
            to="/information/contact" 
            :class="{'font-bold' : this.$nuxt.$route.path == '/information/contact'}"
        >
            <li class="hover:text-gray-500">Contact Us</li>
        </NuxtLink>
        <NuxtLink 
            to="/information/about-website"
            :class="{'font-bold' : this.$nuxt.$route.path == '/information/about-website'}"
        >
            <li class="hover:text-gray-500" >About this Website</li>
        </NuxtLink>
    </ul>
</template>