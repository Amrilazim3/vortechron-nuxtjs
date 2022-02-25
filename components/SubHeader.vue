<template>
    <nav style="background:rgba(211, 211, 211, 1);">
        <div class="grid p-6 py-4 sm:justify-center sm:grid-cols-3 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:grid-cols-4 lg:max-w-4xl xl:grid-cols-3 xl:max-w-5xl 2xl:max-w-7xl">
            <div class="inline-flex sm:col-span-2 sm:self-center lg:col-span-2 xl:col-span-1">
                <ul class="sm:flex sm:space-x-8">
                    <CategoryDropDown/>
                    
                    <NuxtLink to="/">
                        <li class="text-lg font-bold hover:underline">Latest</li>
                    </NuxtLink>

                    <NuxtLink to="/">
                        <li class="text-lg font-bold hover:underline md:ml-4">Popular</li>
                    </NuxtLink>
                </ul>
            </div>
            <div class="pt-2 sm:col-span-1 sm:mt-0 lg:col-span-2 xl:col-span-1 xl:ml-12 2xl:-ml-0">
                <InputWithIcon>
                    <img slot="icon" src="~/assets/search-icon.svg" alt="search-icon" class="absolute ml-3 mt-1 opacity-30 pointer-events-none">
                    <input type="text" placeholder="Search users or posts" 
                        style="background: rgba(196, 196, 196, 1);"
                        class="pl-10 py-0.5 text-black placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-400 w-2/5 sm:w-max focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        @keyup="search($event.target.value)"
                    >
                </InputWithIcon>
                <div class="absolute p-2 mt-2 z-10 bg-white rounded-md w-56" v-if="showSearchResult">
                    <div class="flex">
                        <p class="flex-1 text-center border-b-2 border-blue-400">users</p>
                        <p class="flex-1 text-center">posts</p>
                    </div>
                    <div v-for="user in users" :key="user.id">
                        <template v-if="user.id !== currentUserId">
                            <div class="flex mt-2">
                                <template v-if="!user.image_url">
                                    <button class="bg-gray-300 p-2.5 rounded-full cursor-pointer" @click.prevent="$router.push(`/users/${user.id}`)">
                                        <img class="h-4 w-4" src="~/assets/default-profile-icon.svg" alt="">
                                    </button>
                                </template>
                                <template v-else>
                                    <button @click.prevent="$router.push(`/users/${user.id}`)">
                                        <img class="h-8 w-8 rounded-full" :src="user.image_full_url" id="image-url">
                                    </button>
                                </template>
                                <NuxtLink :to="`/users/${user.id}`" class="self-center ml-2.5 truncate">{{ user.username }}</NuxtLink>
                            </div>
                            <div class="h-0.5 w-full bg-gray-200 mt-2"></div>
                        </template>
                        <template v-else>
                            <div class="flex mt-2">
                                <template v-if="!user.image_url">
                                    <button class="bg-gray-300 p-2.5 rounded-full cursor-pointer" @click.prevent="$router.push('/user/account/profile')">
                                        <img class="h-4 w-4" src="~/assets/default-profile-icon.svg" alt="">
                                    </button>
                                </template>
                                <template v-else>
                                    <button @click.prevent="$router.push('/user/account/profile')">
                                        <img class="h-8 w-8 rounded-full" :src="user.image_full_url" id="image-url">
                                    </button>
                                </template>
                                <NuxtLink to="/user/account/profile" class="self-center ml-2.5 truncate">{{ user.username }}</NuxtLink>
                                </div>
                            <div class="h-0.5 w-full bg-gray-200 mt-2"></div>
                        </template>
                    </div>
                    <p v-if="noResult" class="text-black font-thin">no users found.</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            users: {},
            currentUserId: null,
            showSearchResult: false,
            noResult: false,
        }
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
    },

    methods: {
        async search(searchValue) {
            if (searchValue == '') {
                    this.showSearchResult = false;
                    return false;
            }
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.$axios.$get(`api/users?search=${searchValue}`)
                    .then((res) => { 
                        this.noResult = false,
                        this.showSearchResult = true;
                        if (res.users.length == 0) {
                            this.noResult = true;
                        }
                        this.users = res.users;
                    })
            }, 600);
        }
    }
}
</script>