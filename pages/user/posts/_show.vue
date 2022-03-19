<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl">
        <main class="px-8 py-6 mt-10 bg-white rounded-md">
            <button class="flex my-10" @click.prevent="$router.back()">
                <img src="~/assets/single-drop-down-arrow.svg" alt="" class="origin-center transform rotate-90">
                <h4 class="self-center text-lg font-semibold">back</h4>
            </button>
            <h2 class="mb-10 text-3xl font-medium text-center">{{ title }}</h2>
            <div class="flex justify-between mb-2">
                <div class="flex">
                    <template v-if="!image_url">
                        <button class="bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push('/user/account/profile')">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </button>
                    </template>
                    <template v-else>
                        <button @click.prevent="$router.push('/user/account/profile')">
                            <img class="w-10 h-10 rounded-full" :src="image_full_url" id="image-url">
                        </button>
                    </template>
                    <NuxtLink to="/user/account/profile" class="font-normal self-center ml-2.5 hover:underline">{{ username }}</NuxtLink>
                </div>
                <div class="self-center">
                    <button>
                        <ShowPostDropDown :slug="$route.params.show" />
                    </button>
                    <button class="ml-4">
                        <img src="~/assets/heart-logo.svg" alt="" class="h-6 opacity-20">
                    </button> 
                    <button class="ml-4">
                        <img src="~/assets/bookmark-logo.svg" alt="" class="h-6 opacity-20">
                    </button>
                </div>
            </div>
            <VueMomentsAgo prefix="posted" suffix="ago" :date="date" lang="en" class="text-sm font-normal" />
            <div class="h-0.5 bg-gray-500 mt-4"></div>
            <div class="min-w-full prose" v-html="body">
                {{ body }}
            </div>
            <NuxtLink :to="`/posts/categories/${categorySlug}`" class="text-blue-500 underline">{{ category }}</NuxtLink>
        </main>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'
export default {
    components: {
        VueMomentsAgo
    },
    
    layout: 'hide-subnav',
    
    middleware: 'auth',

    head: {
        title: 'Show Post',
        meta: [
            { hid: 'description', name: 'description', content: 'show post' }
        ],
    },

    mounted() {
        this.getPost();
    },

    data() {
        return {
            title: '',
            date: '',
            body: '',
            category: '',
            categorySlug: '',
            username: '',
            image_url: '',
            image_full_url: ''
        }
    },

    methods: {
        async getPost() {
            await this.$axios.$get(`/api/user/posts/${this.$route.params.show}`)
                .then(({ post }) => {
                    this.title = post.title;
                    this.body = post.body;
                    this.date = post.created_at;
                    this.username = post.username[0];
                    this.image_url = post.image_url[0];
                    this.image_full_url = post.image_full_url;
                    this.category = post.category[0];
                    this.categorySlug = post.categorySlug[0];
                })
        }
    }
}
</script>

<style>

</style>