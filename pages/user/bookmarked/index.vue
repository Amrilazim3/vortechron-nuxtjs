<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h1 class="my-4 text-4xl font-normal text-center">Bookmarked Posts</h1>
            <section v-if="!noPost" class="w-10/12 mx-auto mt-4 sm:grid sm:grid-cols-6 sm:w-full">
                <div class="relative px-2 py-1 mb-6 transition duration-300 ease-in-out bg-white border rounded-md shadow-2xl sm:mr-3 hover:bg-gray-100 sm:col-span-3 lg:col-span-2" 
                    v-for="post in posts"
                    :key="post.user_id"
                >
                    <template v-if="post.user_id == currentUserId">
                        <template v-if="!post.thumbnail">
                            <div class="flex w-full h-32 mb-4 bg-gray-300">
                                <p class="self-center mx-auto font-thin cursor-default">BLANK</p>
                            </div>
                        </template>
                        <template v-else>
                            <img :src="post.thumbnail" alt="" class="h-32 mb-4 bg-gray-300" style='width: 100%; object-fit: contain'>
                        </template>
                        <template v-if="post.category[0]">
                            <NuxtLink :to="`/posts/categories/${post.category_slug[0]}`" class="text-sm text-blue-400 hover:underline">{{ post.category[0] }}</NuxtLink>
                        </template>
                        <template v-else>
                            <p class="text-sm opacity-0 cursor-default">hidden</p>
                        </template>
                        <NuxtLink :to="`/user/posts/${post.slug}`" class="flex text-lg font-bold mt-2.5 hover:underline">{{ post.title }}</NuxtLink>
                        <p class="h-20 mt-4 text-sm">{{ post.excerpt }}</p>
                        <div class="bottom-0 flex justify-between pb-2">
                            <div class="flex">
                                <template v-if="!post.image_url">
                                    <button class="bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push('/user/account/profile')">
                                        <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                    </button>
                                </template>
                                <template v-else>
                                    <button @click.prevent="$router.push('/user/account/profile')">
                                        <img class="rounded-full w-9 h-9" :src="post.image_full_url" id="image-url">
                                    </button>
                                </template>
                                <div class="inline-grid ml-2">
                                    <NuxtLink to="/user/account/profile" class="text-base font-medium">{{ post.username }}</NuxtLink>
                                    <VueMomentsAgo prefix="posted" suffix="ago" :date="post.created_at" lang="en" class="self-center" />
                                </div>
                            </div>
                            <button class="self-center bg-blue-300 px-2 py-1.5 border rounded-md hover:bg-blue-400" @click="$router.push(`/user/posts/${post.slug}`)">Read more</button>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="!post.thumbnail">
                            <div class="flex w-full h-32 mb-4 bg-gray-300">
                                <p class="self-center mx-auto font-thin cursor-default">BLANK</p>
                            </div>
                        </template>
                        <template v-else>
                            <img :src="post.thumbnail" alt="" class="h-32 mb-4 bg-gray-300" style='width: 100%; object-fit: contain'>
                        </template>
                        <template v-if="post.category[0]">
                            <NuxtLink :to="`/posts/categories/${post.category_slug[0]}`" class="text-sm text-blue-400 hover:underline">{{ post.category[0] }}</NuxtLink>
                        </template>
                        <template v-else>
                            <p class="text-sm opacity-0 cursor-default">hidden</p>
                        </template>
                        <NuxtLink :to="`/users/${post.user_id}/posts/${post.slug}`" class="flex text-lg font-bold mt-2.5 hover:underline">{{ post.title }}</NuxtLink>
                        <p class="h-20 mt-4 text-sm">{{ post.excerpt }}</p>
                        <div class="bottom-0 flex justify-between pb-2">
                            <div class="flex">
                                <template v-if="!post.image_url">
                                    <button class="bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${post.user_id}`)">
                                        <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                    </button>
                                </template>
                                <template v-else>
                                    <button @click.prevent="$router.push(`/users/${post.user_id}`)">
                                        <img class="rounded-full w-9 h-9" :src="post.image_full_url" id="image-url">
                                    </button>
                                </template>
                                <div class="inline-grid ml-2">
                                    <NuxtLink :to="`/users/${post.user_id}`" class="text-base font-medium">{{ post.username }}</NuxtLink>
                                    <VueMomentsAgo prefix="posted" suffix="ago" :date="post.created_at" lang="en" class="self-center" />
                                </div>
                            </div>
                            <button class="self-center bg-blue-300 px-2 py-1.5 border rounded-md hover:bg-blue-400" @click="$router.push(`/users/${post.user_id}/posts/${post.slug}`)">Read more</button>
                        </div>
                    </template>
                </div>
                <div v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>
            </section>
            <section v-else class="mx-auto mt-28 sm:w-full">
                <p class="mt-24 text-lg font-normal text-center">No bookmarked posts...</p>
            </section>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

export default {
    layout: 'hide-subnav',
    
    components: {
        VueMomentsAgo
    },

    middleware: 'auth',

    head: {
        title: '| Bookmarked Posts',
        meta: [
            { hid: 'description', name: 'description', content: 'show all user bookmarked posts' }
        ],
    },

    
    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
        this.getBookmarkedPosts(this.page)
    },

    data() {
        return {
            page: 1,
            lastPage: 2,
            posts: [],
            currentUserId: null,
            noPost: false,
        }
    },

    methods: {
        getBookmarkedPosts(page) {
            this.$axios.$get(`/api/user/bookmarked/posts?page=${page}`)
                .then(({ posts }) => {
                    if (posts.length == 0) {
                        this.lastPage = this.page;
                        if (this.page == 1) {
                            this.noPost = true;
                        }
                    }
                    this.posts.push(...posts);
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.lastPage++;
            this.getBookmarkedPosts(this.page);
        },
    }
}
</script>