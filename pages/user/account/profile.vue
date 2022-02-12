<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="md:flex md:justify-between">
            <div class="flex mt-8">
                <template v-if="this.$auth.user.image_url">
                    <div>
                        <img class="h-16 w-16 rounded-full" :src="this.$auth.user.image_full_url" alt="">
                    </div>
                </template>
                <template v-else>
                    <div class="bg-gray-300 p-2.5 rounded-full">
                        <img class="h-12" src="~/assets/default-profile-icon.svg" alt="">
                    </div>
                </template>
                <div class="ml-4">
                    <h2 class="text-xl font-bold text-center">{{ this.$auth.user.username }}</h2>
                    <NuxtLink to="/user/account/edit-profile" class="bg-blue-500 font-medium px-4 py-0.5 rounded-full hover:bg-blue-600">
                        edit profile
                    </NuxtLink>
                </div>
            </div>
            <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center">
                <span>0 follower</span>
                <span>0 following</span>
                <span>0 post</span>
            </div>
        </div>
        <template v-if="this.$auth.user.bio == null">
            <p class="mt-6 font-thin">No bio yet</p>
        </template>
        <template v-else>
            <p class="mt-6">{{ this.$auth.user.bio }}</p>
        </template>
    </section>
</template>

<script>
export default {
    middleware: 'auth',

    head: {
        title: '| Profile',
        meta: [
            { hid: 'description', name: 'description', content: 'Bookmarked' }
        ],
    },
}
</script>