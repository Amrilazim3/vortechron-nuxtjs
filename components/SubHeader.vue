<template>
    <nav style="background:rgba(211, 211, 211, 1);">
        <div class="grid p-6 py-4 sm:justify-center sm:grid-cols-3 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:grid-cols-4 lg:max-w-4xl xl:grid-cols-3 xl:max-w-5xl 2xl:max-w-7xl">
            <div class="inline-flex sm:col-span-2 sm:self-center lg:col-span-2 xl:col-span-1">
                <ul class="sm:flex sm:space-x-8">
                    <CategoryDropDown/>
                    
                    <NuxtLink to="/posts/latest" :class="$nuxt.$route.path == '/posts/latest' ? 'underline' : ''">
                        <li class="text-lg font-bold hover:underline">Latest</li>
                    </NuxtLink>

                    <NuxtLink to="/">
                        <li class="text-lg font-bold hover:underline md:ml-4">Popular</li>
                    </NuxtLink>
                </ul>
            </div>
            <div id="search-modal" class="pt-2 sm:col-span-1 sm:mt-0 lg:col-span-2 xl:col-span-1 xl:ml-12 2xl:-ml-0">
                <InputWithIcon>
                    <img slot="icon" src="~/assets/search-icon.svg" alt="search-icon" class="absolute mt-1 ml-3 pointer-events-none opacity-30">
                    <input type="text" placeholder="Search users or posts" 
                        style="background: rgba(196, 196, 196, 1);"
                        class="pl-10 py-0.5 text-black placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-400 w-2/5 sm:w-max focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        @keyup="search($event.target.value)"
                        @focus="search($event.target.value)"
                    >
                </InputWithIcon>
                <div class="absolute z-10 w-56 p-2 mt-2 bg-white rounded-md" v-if="showUsersResult || showPostsResult">
                    <div class="flex">
                        <button 
                            @click="showUsersResult = !showUsersResult; showPostsResult = !showPostsResult; recentOpen = 'users'" 
                            class="flex-1 text-center" 
                            :class="showUsersResult ? 'border-b-2 border-blue-400' : ''"
                        >
                            users
                        </button>
                        <button 
                            @click="showPostsResult = !showPostsResult; showUsersResult = !showUsersResult; recentOpen = 'posts'" 
                            class="flex-1 text-center"
                            :class="showPostsResult ? 'border-b-2 border-blue-400' : ''"
                        >
                            posts
                        </button>
                    </div>
                    <div v-if="showUsersResult">
                        <div v-for="user in users" :key="user.id">
                            <template v-if="user.id !== currentUserId">
                                <div class="flex py-1.5 hover:bg-gray-200">
                                    <template v-if="!user.image_url">
                                        <button class="bg-gray-300 p-2.5 rounded-full cursor-pointer" @click.prevent="$router.push(`/users/${user.id}`)">
                                            <img class="w-4 h-4" src="~/assets/default-profile-icon.svg" alt="">
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button @click.prevent="$router.push(`/users/${user.id}`)">
                                            <img class="w-8 h-8 rounded-full" :src="user.image_full_url" id="image-url">
                                        </button>
                                    </template>
                                    <NuxtLink :to="`/users/${user.id}`" class="self-center ml-2.5 w-9/12 truncate">{{ user.username }}</NuxtLink>
                                </div>
                                <div class="h-0.5 w-full bg-gray-200"></div>
                            </template>
                            <template v-else>
                                <div class="flex py-1.5 hover:bg-gray-200">
                                    <template v-if="!user.image_url">
                                        <button class="bg-gray-300 p-2.5 rounded-full cursor-pointer" @click.prevent="$router.push('/user/account/profile')">
                                            <img class="w-4 h-4" src="~/assets/default-profile-icon.svg" alt="">
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button @click.prevent="$router.push('/user/account/profile')">
                                            <img class="w-8 h-8 rounded-full" :src="user.image_full_url" id="image-url">
                                        </button>
                                    </template>
                                    <NuxtLink to="/user/account/profile" class="self-center ml-2.5 w-9/12 truncate">{{ user.username }}</NuxtLink>
                                </div>
                                <div class="h-0.5 w-full bg-gray-200"></div>
                            </template>
                        </div>
                        <p v-if="noUsersResult" class="font-thin text-black">no users found.</p>
                    </div>
                    <div v-else-if="showPostsResult">
                        <div v-for="post in posts" :key="post.user_id">
                            <template v-if="post.user_id !== currentUserId">
                                <div class="flex py-1.5 hover:bg-gray-200">
                                    <NuxtLink :to="`/users/${post.user_id}/posts/${post.slug}`">{{ post.title }}</NuxtLink>
                                </div>
                                <div class="h-0.5 w-full bg-gray-200"></div>
                            </template>
                            <template v-else>
                                <div class="flex py-1.5 hover:bg-gray-200">
                                    <NuxtLink :to="`/user/posts/${post.slug}`">{{ post.title }}</NuxtLink>
                                </div>
                                <div class="h-0.5 w-full bg-gray-200"></div>
                            </template>
                        </div>
                        <p v-if="noPostsResult" class="font-thin text-black">no posts found.</p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            currentUserId: null,
            
            users: [],
            showUsersResult: false,
            noUsersResult: false,
            
            posts: [],
            showPostsResult: false,
            noPostsResult: false,

            recentOpen: 'users'
        }
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
    },

    methods: {
        async search(searchValue) {
            var ignoreClickOnMeElement = document.getElementById('search-modal');
            setTimeout(() => document.addEventListener('click', (event) => {
                var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
                if (!isClickInsideElement) {
                    this.showUsersResult = false; this.showPostsResult = false;
                }
            }), 0);

            if (searchValue == '') {
                    this.showUsersResult = false;
                    this.showPostsResult = false;
                    return false;
            }

            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.$axios.$get(`api/users-or-posts?search=${searchValue}`)
                    .then((res) => {
                        if (this.recentOpen == 'users') {
                            this.showUsersResult = true;
                        } else {
                            this.showPostsResult = true;
                        }

                        if (res.users.data.length == 0) {
                            this.noUsersResult = true;
                        }
                        this.users = res.users.data;

                        if (res.posts.data.length == 0) {
                            this.noPostsResult = true;
                        }
                        this.posts = res.posts.data;
                    })
            }, 200);
        },
    }
}
</script>