<template>
    <ul class="inline-block xl:flex xl:ml-8 xl:space-x-8">
        <button @click.prevent="openAboutUs">
            <li class="block hover:text-gray-500">About us</li>
        </button>
        <button @click.prevent="openContactUs">
            <li class="hover:text-gray-500">Contact Us</li>
        </button>
        <button @click.prevent="openAboutWebsite">
            <li class="hover:text-gray-500" >About this Website</li>
        </button>
    </ul>
</template>

<script>
export default {
    methods: {
        openAboutUs() {
            window.open('https://github.com/Amrilazim3');
        },

        openContactUs() {
            window.open('https://www.instagram.com/amrilazim_/?hl=ms');
        },

        openAboutWebsite() {
            window.open('https://app.vortechron.com/information/about-website');
        }
    }
}
</script>