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
                <div class="ml-4">
                    <h2 class="text-xl font-bold text-center">{{ user.username }}</h2>
                    <template v-if="user.isFriendWith">
                        <button class="bg-blue-500 px-4 hover:text-red-500 rounded-md" @click.prevent="deleteFriend(user.id)">
                            Following
                        </button>
                    </template>
                    <template v-else-if="!user.isFriendWith && !user.isSentFriendRequestTo">
                        <button class="bg-blue-500 hover:text-white px-4 rounded-md text-black" @click.prevent="followBack(user.id)">
                            Follow
                        </button>
                    </template>
                    <template v-else-if="!user.isFriendWith && user.isSentFriendRequestTo">
                        <button class="bg-gray-400 px-4 rounded-md hover:text-white" @click.prevent="cancelRequest(user.id)">
                            Requested
                        </button>
                    </template>
                </div>
            </div>
            <div class="font-semibold mt-3.5 space-x-3.5 text-xl md:-mt-0 md:self-center hidden md:block">
                <span>{{ followers }} followers</span>
                <span>{{ following }} following</span>
                <span>0 post</span>
            </div>
        </div>
        <div>
            <p class="mt-6 font-bold">{{ user.name }}</p>
            <template v-if="this.$auth.user.bio == null">
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

    middleware: 'auth',

    head: {
        title: `| Friend`,
        meta: [
            { hid: 'description', name: 'description', content: 'Friend' }
        ],
    },

    mounted() {
        this.getUser();
    },

    data() {
        return {
            user: {},
            followers: 0,
            following: 0,
        }
    },

    methods: {
        getUser() {
            this.$axios.$get(`/api/user/friends/${this.$route.params.id}`)
                .then((res) => {
                    this.followers = res.followers.length;
                    this.following = res.following.length;
                    this.user = res.user;
                    if (res.is_friend_with == 1) {
                        this.user.isFriendWith = true;
                    } else {
                        this.user.isFriendWith = false;
                    }
                    if (res.is_sent_friend_request_to == 1) {
                        this.user.isSentFriendRequestTo = true;
                    } else {
                        this.user.isSentFriendRequestTo = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        followBack(id) {
            this.$axios.$post(`/api/user/friends/${id}`)
                .then(() => {
                    let user = this.user;
                    this.user = {};
                    user.isSentFriendRequestTo = true;
                    this.user = user;
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        cancelRequest(id) {
            this.$axios.$delete(`/api/user/friends/cancel-request/${id}`)
                .then(() => {
                    let user = this.user;
                    this.user = {};
                    user.isSentFriendRequestTo = false;
                    this.user = user;
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        deleteFriend(id) {
            let answer = confirm("If you unfollow this user, you need to make request again to be a friend.");

            if (answer) {
                this.$axios.$delete(`/api/user/friends/${id}/unfollow`)
                    .then((res) => {
                        let user = this.user
                        this.user = {}
                        user.isFriendWith = false;
                        this.user = user;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
    },
}
</script>