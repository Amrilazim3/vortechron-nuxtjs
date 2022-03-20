<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="md:flex md:justify-between">
            <div class="flex mt-8">
                <template v-if="user.image_url">
                    <div>
                        <img class="w-16 h-16 rounded-full" :src="user.image_full_url" alt="">
                    </div>
                </template>
                <template v-else>
                    <div class="bg-gray-300 p-2.5 rounded-full">
                        <img class="h-12" src="~/assets/default-profile-icon.svg" alt="">
                    </div>
                </template>
                <div class="ml-4" v-if="$auth.loggedIn">
                    <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                    <template v-if="userIsFriendWithAuthUser && !isFriendWithUser">
                        <button class="px-4 bg-blue-500 rounded-md hover:text-white" @click.prevent="follow(user.id)">
                            Follow Back
                        </button>
                    </template>
                    <template v-else-if="isFriendWithUser">
                        <button class="px-4 bg-blue-500 rounded-md hover:text-red-500" @click.prevent="unFollow(user.id)">
                            Following
                        </button>
                    </template>
                    <template v-else-if="!isFriendWithUser">
                        <button class="px-4 text-black bg-blue-500 rounded-md hover:text-white" @click.prevent="follow(user.id)">
                            Follow
                        </button>
                    </template>
                </div>
                <div class="ml-4" v-else>
                    <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                    <button class="px-4 bg-blue-500 rounded-md hover:text-white" @click="$router.push('/auth/sign-in')">
                        Follow
                    </button>
                </div>
            </div>
            <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center hidden md:block">
                <NuxtLink :to="`/users/${user.id}/followers`">{{ followers_count }} followers</NuxtLink>
                <NuxtLink :to="`/users/${user.id}/following`">{{ following_count }} following</NuxtLink>
                <span>{{ postsCount }} post</span>
            </div>
        </div>
        <div>
            <p class="mt-6 font-bold">{{ user.name }}</p>
            <template v-if="user.bio == null">
                <p class="font-normal">No bio yet</p>
            </template>
            <template v-else>
                <p class="w-1/3 font-normal" v-html="user.bio">
                    {{ user.bio }}
                </p>
            </template>
        </div>
        <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center md:hidden">
            <NuxtLink :to="`/users/${user.id}/followers`">{{ followers_count }} followers</NuxtLink>
            <NuxtLink :to="`/users/${user.id}/following`">{{ following_count }} following</NuxtLink>
            <span>{{ postsCount }} post</span>
        </div>
        
        <main>
            <div class="h-0.5 bg-white mt-8"></div>

            <div v-if="noPost">
                <h1 class="text-lg text-center mt-52">No post yet : (</h1>
            </div>

            <template v-if="!noPost">
                <section class="w-10/12 mx-auto mt-4 sm:grid sm:grid-cols-6 sm:w-full">
                    <div class="relative px-2 py-1 mb-6 transition duration-300 ease-in-out bg-white border rounded-md shadow-2xl sm:mr-3 hover:bg-gray-100 sm:col-span-3 lg:col-span-2" 
                        v-for="post in posts"
                        :key="post.id"
                    >
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
                        <NuxtLink :to="`/users/${$route.params.id}/posts/${post.slug}`" class="flex text-lg font-bold mt-2.5 hover:underline">{{ post.title }}</NuxtLink>
                        <p class="h-20 mt-4 text-sm">{{ post.excerpt }}</p>
                        <div class="bottom-0 flex justify-between pb-2">
                            <VueMomentsAgo prefix="posted" suffix="ago" :date="post.created_at" lang="en" class="self-center" />
                            <button class="self-center bg-blue-300 px-4 py-1.5 border rounded-md hover:bg-blue-400" @click="$router.push(`/users/${$route.params.id}/posts/${post.slug}`)">View</button>
                        </div>
                    </div>
                    <div v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>
                </section>
            </template>
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

    head: {
        title: '| User',
        meta: [
            { hid: 'description', name: 'description', content: 'User' }
        ],
    },

    mounted() {
        if (this.$auth.loggedIn) {
            if (this.$auth.user.id == this.$route.params.id) {
                this.$router.push('/user/account/profile');
            }
        }
        if (!this.$auth.loggedIn) {
            this.showUserWhileUnAuthenticated(this.page)
        } else {
            this.getUser(this.page)
        }
    },
    
    data() {
        return {
            user: {},
            followers_count: 0,
            following_count: 0,
            isFriendWithUser: false,
            userIsFriendWithAuthUser: false,
            page: 1,
            lastPage: 1,
            postsCount: 0,
            posts: [],
            noPost: false,
        }
    },

    methods: {
        async showUserWhileUnAuthenticated(page) {
            await this.$axios.$get(`/api/users/view-only/${this.$route.params.id}?page=${page}`)
                .then((res) => {
                    this.user = res.user;
                    this.followers_count = res.followers_count;
                    this.following_count = res.following_count;
                    this.isFriendWithUser = res.is_friend_with_user;
                    this.userIsFriendWithAuthUser = res.user_friend_with_auth_user;
                    this.postsCount = res.posts_count;
                    this.lastPage = res.posts.meta.last_page;
                    if (res.posts.data.length == 0) {
                        this.noPost = true; 
                    }
                    this.posts.push(...res.posts.data);
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        this.$router.push('/dashboard');
                    }
                })
        },

        async getUser(page) {
            await this.$axios.$get(`/api/users/${this.$route.params.id}?page=${page}`)
                .then((res) => {
                    this.user = res.user;
                    this.followers_count = res.followers_count;
                    this.following_count = res.following_count;
                    this.isFriendWithUser = res.is_friend_with_user;
                    this.userIsFriendWithAuthUser = res.user_friend_with_auth_user;
                    this.postsCount = res.posts_count;
                    this.lastPage = res.posts.meta.last_page;
                    if (res.posts.data.length == 0) {
                        this.noPost = true; 
                    }
                    this.posts.push(...res.posts.data);
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        this.$router.push('/dashboard');
                    }
                })
        },

        follow(id) {
            this.$axios.$post(`/api/users/${id}`)
                .then(() => {
                    this.followers_count += 1;
                    this.isFriendWithUser = true;
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/users/unfollow/${id}`)
                .then(() => {
                    this.followers_count -= 1;
                    this.isFriendWithUser = false;
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            if (this.$auth.user.loggedIn) {
                this.getUser(this.page);                
            } else {
                this.showUserWhileUnAuthenticated(this.page);
            }
        },
    }
}
</script>