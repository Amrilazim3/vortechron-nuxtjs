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
                    <NuxtLink to="/user/account/profile/edit-profile" class="bg-blue-500 font-medium px-4 rounded-full hover:bg-blue-600">
                        edit profile
                    </NuxtLink>
                </div>
            </div>
            <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center hidden md:block">
                <NuxtLink to="/user/followers">{{ followersCount }} followers</NuxtLink>
                <NuxtLink to="/user/following">{{ followingCount }} following</NuxtLink>
                <span>{{ postsCount }} post</span>
            </div>
        </div>
        <div>
            <p class="mt-6 font-bold">{{ this.$auth.user.name }}</p>
            <template v-if="this.$auth.user.bio == null">
                <p class="font-normal">No bio yet</p>
            </template>
            <template v-else>
                <p class="font-normal">{{ this.$auth.user.bio }}</p>
            </template>
        </div>
        <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center md:hidden">
            <NuxtLink to="/user/followers">{{ followersCount }} followers</NuxtLink>
            <NuxtLink to="/user/following">{{ followingCount }} following</NuxtLink>
            <span>{{ postsCount }} post</span>
        </div>

        <main>
            <div class="h-0.5 bg-white mt-8"></div>

            <div v-if="noPost && $auth.user.email_verified_at || $auth.user.service">
                <h1 class="text-center text-lg mt-52">No post yet, <NuxtLink to="/user/posts/create" class="text-blue-500 hover:underline">create your post</NuxtLink> now</h1>
            </div>
            <div v-else-if="noPost && !$auth.user.email_verified_at && !$auth.user.service">
                <h1 class="text-center text-red-400 text-lg mt-44">Please verified your account to create a post</h1>
            </div>

            <template v-if="!noPost">
                <section class="w-10/12 mt-4 mx-auto sm:grid sm:grid-cols-6 sm:w-full">
                    <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-100 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2" 
                        v-for="post in posts"
                        :key="post.id"
                    >
                        <template v-if="!post.thumbnail">
                            <div class="flex bg-gray-300 w-full h-32 mb-4">
                                <p class="self-center mx-auto font-thin cursor-default">BLANK</p>
                            </div>
                        </template>
                        <template v-else>
                            <img :src="post.thumbnail" alt="" class="w-full h-32 mb-4">
                        </template>
                        <template v-if="post.category[0]">
                            <NuxtLink :to="`/user/posts/categories/${post.category_slug[0]}`" class="text-sm text-blue-400 hover:underline">{{ post.category[0] }}</NuxtLink>
                        </template>
                        <template v-else>
                            <p class="text-sm opacity-0 cursor-default">hidden</p>
                        </template>
                        <NuxtLink :to="`/user/posts/${post.slug}`" class="flex text-lg font-bold mt-2.5 hover:underline">{{ post.title }}</NuxtLink>
                        <p class="mt-4 text-sm h-20">{{ post.excerpt }}</p>
                        <div class="pb-2 bottom-0 flex justify-between">
                            <VueMomentsAgo prefix="posted" suffix="ago" :date="post.created_at" lang="en" class="self-center" />
                            <button class="self-center bg-blue-300 px-4 py-1.5 border rounded-md hover:bg-blue-400" @click="$router.push(`/user/posts/${post.slug}`)">View</button>
                        </div>
                    </div>
                    <div v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>
                </section>
            </template>

            <NuxtLink to="/user/posts/create" v-if="!noPost" class="fixed bottom-1.5 right-1.5 px-3.5 py-1 rounded-lg bg-blue-400 hover:bg-blue-500">
                create post
            </NuxtLink>
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
        title: '| Profile',
        meta: [
            { hid: 'description', name: 'description', content: 'Profile' }
        ],
    },

    mounted() {
        this.getPosts(this.page);
        this.getFollowersAndFollowing();
    },

    data() {
        return {
            followersCount: 0,
            followingCount: 0,
            posts: [],
            page: 1,
            lastPage: 1,
            postsCount: 0,
            noPost: false,
        }
    },

    methods: {
        getFollowersAndFollowing() {
            this.$axios.$get('/api/user/account/profile')
                .then((res) => {
                    this.followersCount = res.followers_count;
                    this.followingCount = res.following_count;
                })
        },

        getPosts(page) {
            this.$axios.$get(`/api/user/posts?page=${page}`)
                .then(({ posts, posts_count }) => {
                    this.postsCount = posts_count;
                    this.lastPage = posts.meta.last_page;

                    if (posts.data.length == 0) {
                        this.noPost = true
                    }

                    this.posts.push(...posts.data);
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.getPosts(this.page);                
        },

    }
}
</script>