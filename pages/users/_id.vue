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
                <template v-if="this.$auth.loggedIn">
                    <div class="ml-4">
                        <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                        <template v-if="user.isSentFriendRequestFrom">
                            <p class="text-sm font-light">this user wants to follow you</p>
                            <button class="bg-blue-500 px-4 rounded-md hover:text-white" @click.prevent="acceptRequest(user.id)">
                                Accept
                            </button>
                            <button class="bg-red-500 px-4 rounded-md hover:text-white" @click.prevent="denyRequest(user.id)">
                                Ignore
                            </button>
                        </template>
                        <template v-else-if="user.isSentFriendRequestTo">
                            <button class="bg-gray-400 px-4 rounded-md hover:text-white" @click.prevent="cancelRequest(user.id)">
                                Requested
                            </button>
                        </template>
                        <template v-else-if="user.isFriendWith">
                            <button class="bg-blue-500 px-4 hover:text-red-500 rounded-md" @click.prevent="unFollow(user.id)">
                                Following
                            </button>
                        </template>
                        <template v-else-if="!user.isFriendWith && user.isNotFollowBack">
                            <button class="bg-blue-500 px-4 hover:text-white rounded-md" @click.prevent="follow(user.id)">
                                Follow Back
                            </button>
                        </template>
                        <template v-else-if="!user.isFriendWith">
                            <button class="bg-blue-500 hover:text-white px-4 rounded-md text-black" @click.prevent="follow(user.id)">
                                Follow
                            </button>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div class="ml-4">
                        <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                        <button class="bg-blue-500 hover:text-white px-4 rounded-md text-black" @click="$router.push('/auth/sign-in')">
                            Sign in to follow
                        </button>
                    </div>
                </template>
            </div>
            <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center hidden md:block">
                <span>{{ followers }} followers</span>
                <span>{{ following }} following</span>
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
            <span>{{ followers }} followers</span>
            <span>{{ following }} following</span>
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
                        this.user.isNotFollowBack = false;
                        console.log('first condition');
                    } else if (res.is_friend_with == 0 && res.user_friend_with_auth_user == 1) {
                        this.user.isFriendWith = false;
                        this.user.isNotFollowBack = true;
                        console.log('second condition');
                    } else if (res.is_friend_with == 1 && res.user_friend_with_auth_user == 0) {
                        this.user.isFriendWith = true;
                        this.user.isNotFollowBack = false;
                        console.log('third condition');
                    }  else if (res.is_friend_with == 0 && res.user_friend_with_auth_user == 0) {
                        this.user.isFriendWith = false;
                        this.user.isNotFollowBack = false;
                        console.log('fourth conditon');
                    }

                    if (res.is_sent_friend_request_to == 1) {
                        this.user.isSentFriendRequestTo = true;
                    } else {
                        this.user.isSentFriendRequestTo = false;
                    }
                    if (res.is_sent_friend_request_from == 1) {
                        this.user.isSentFriendRequestFrom = true;
                    } else {
                        this.user.isSentFriendRequestFrom = false;
                    }

                    console.log(this.user);
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        this.$router.push('/dashboard');
                    }
                })
        },

        acceptRequest(id) {
            this.$axios.$patch(`/api/users/accept/${id}`)
                .then(() => {
                    let user = this.user;
                    this.user = {};
                    user.isSentFriendRequestFrom = false;
                    if (!user.isFriendWith) {
                        user.isNotFollowBack = true;  
                    } 
                    this.user = user;
                    this.following += 1;
                })
        },

        denyRequest(id) {
            this.$axios.$patch(`/api/users/deny/${id}`)
                .then(() => {
                    let user = this.user;
                    this.user = {};
                    user.isSentFriendRequestFrom = false;
                    this.user = user;
                })
        },

        follow(id) {
            this.$axios.$post(`/api/users/${id}`)
                .then(() => {
                    let user = this.user;
                    this.user = {};
                    user.isSentFriendRequestTo = true;
                    this.user = user;
                })
        },

        cancelRequest(id) {
            this.$axios.$delete(`/api/users/cancel-request/${id}`)
                .then(() => {
                    let user = this.user;
                    this.user = {};
                    user.isSentFriendRequestTo = false;
                    this.user = user;
                })
        },

        unFollow(id) {
            let answer = confirm("If you unfollow this user, you need to make request again to be a friend.");

            if (answer) {
                this.$axios.$delete(`/api/users/unfollow/${id}`)
                    .then(() => {
                        let user = this.user;
                        this.user = {};
                        user.isFriendWith = false;
                        this.user = user;
                    })
            }
        },

    }
}
</script>