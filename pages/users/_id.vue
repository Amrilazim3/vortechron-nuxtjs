<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="md:flex md:justify-between">
            <div class="flex mt-8">
                <template v-if="user.image_url">
                    <div>
                        <img class="h-16 w-16 rounded-full" :src="user.image_full_url" alt="">
                    </div>
                </template>
                <template v-else>
                    <div class="bg-gray-300 p-2.5 rounded-full">
                        <img class="h-12" src="~/assets/default-profile-icon.svg" alt="">
                    </div>
                </template>
                <div class="ml-4" v-if="$auth.loggedIn">
                    <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                    <template v-if="!user.isFriendWith && user.isFriendWithAuthUser">
                        <button class="bg-blue-500 px-4 hover:text-white rounded-md" @click.prevent="follow(user.id)">
                            Follow Back
                        </button>
                    </template>
                    <template v-else-if="user.isFriendWith">
                        <button class="bg-blue-500 px-4 hover:text-red-500 rounded-md" @click.prevent="unFollow(user.id)">
                            Following
                        </button>
                    </template>
                    <template v-else-if="!user.isFriendWith">
                        <button class="bg-blue-500 hover:text-white px-4 rounded-md text-black" @click.prevent="follow(user.id)">
                            Follow
                        </button>
                    </template>
                </div>
                <div class="ml-4" v-else>
                    <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                    <button class="bg-blue-500 px-4 hover:text-white rounded-md" @click="$router.push('/auth/sign-in')">
                        Follow
                    </button>
                </div>
            </div>
            <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center hidden md:block">
                <NuxtLink :to="`/users/followers/${user.id}`">{{ followers }} followers</NuxtLink>
                <NuxtLink :to="`/users/following/${user.id}`">{{ following }} following</NuxtLink>
                <span>0 post</span>
            </div>
        </div>
        <div>
            <p class="mt-6 font-bold">{{ user.name }}</p>
            <template v-if="user.bio == null">
                <p class="font-normal">No bio yet</p>
            </template>
            <template v-else>
                <p class="font-normal">{{ user.bio }}</p>
            </template>
        </div>
        <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center md:hidden">
            <NuxtLink :to="`/users/followers/${user.id}`">{{ followers }} followers</NuxtLink>
            <NuxtLink :to="`/users/following/${user.id}`">{{ following }} following</NuxtLink>
            <span>0 post</span>
        </div>
    </section>
</template>


<script>
export default {
    layout: 'hide-subnav',

    head: {
        title: '| User',
        meta: [
            { hid: 'description', name: 'description', content: 'User' }
        ],
    },

    mounted() {
        if (!this.$auth.loggedIn) {
            this.showUserWhileUnAuthenticated()
        } else {
            this.getUser()
        }
    },
    
    data() {
        return {
            user: {},
            followers: 0,
            following: 0,
        }
    },

    methods: {
        async showUserWhileUnAuthenticated() {
            await this.$axios.$get(`/api/users/view-only/${this.$route.params.id}`)
                .then((res) => {
                    this.user = res.user;
                    this.followers = res.followers.length;
                    this.following = res.following.length;
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        this.$router.push('/dashboard');
                    }
                })
        },

        async getUser() {
            await this.$axios.$get(`/api/users/${this.$route.params.id}`)
                .then((res) => {
                    this.user = res.user;
                    this.followers = res.followers.length;
                    this.following = res.following.length;

                    if (res.is_friend_with == 1 && res.user_friend_with_auth_user == 1) {
                        this.user.isFriendWith = true;
                        this.user.isFriendWithAuthUser = true;
                        this.user.isNotFollowBack = false;
                    } else if (res.is_friend_with == 0 && res.user_friend_with_auth_user == 1) {
                        this.user.isFriendWith = false;
                        this.user.isFriendWithAuthUser = true;
                        this.user.isNotFollowBack = true;
                    } else if (res.is_friend_with == 1 && res.user_friend_with_auth_user == 0) {
                        this.user.isFriendWith = true;
                        this.user.isFriendWithAuthUser = false;
                        this.user.isNotFollowBack = false;
                    }  else if (res.is_friend_with == 0 && res.user_friend_with_auth_user == 0) {
                        this.user.isFriendWith = false;
                        this.user.isFriendWithAuthUser = false;
                        this.user.isNotFollowBack = false;
                    }
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
                    this.followers += 1;
                    let user = this.user;
                    this.user = {};
                    user.isFriendWith = true;
                    this.user = user;
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/users/unfollow/${id}`)
                .then(() => {
                    this.followers -= 1;
                    let user = this.user;
                    this.user = {};
                    user.isFriendWith = false;
                    if (this.isFriendWithAuthUser) {
                        user.isNotFollowBack = true;
                    }
                    this.user = user;
                })
        },

    }
}
</script>