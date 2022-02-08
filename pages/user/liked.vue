<template>
    <section class="grid p-6 sm:justify-center sm:grid-cols-3 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h1>Liked section</h1>
    </section>
</template>

<script>
export default {
    middleware: 'auth',

    head: {
        title: '| Liked',
        meta: [
            { hid: 'description', name: 'description', content: 'Liked' }
        ],
    },
}
</script>