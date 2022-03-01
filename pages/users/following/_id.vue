<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-semibold">Following</h2>
        <div class="h-1 mb-4 bg-gray-200 w-full"></div>
        <div v-if="noFollowingMessage" class="flex h-56 justify-center">
            <h2 class="text-2xl self-end">No following yet</h2>
        </div>
        <div v-else v-for="follow in following" :key="follow.id">
            <div class="bg-white mb-1.5 rounded-md">
                <div class="flex px-2 py-2 justify-between">
                    <template v-if="!follow.image_url">
                        <template v-if="$auth.user.id == follow.id">
                            <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push('/user/account/profile')">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                        <template v-else>
                            <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${follow.id}`)">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="$auth.user.id == follow.id">
                            <button class="mr-2" @click.prevent="$router.push('/user/account/profile')">
                                <img class="h-10 w-10 rounded-full" :src="follow.image_full_url" id="image-url">
                            </button>
                        </template>
                        <template v-else>
                            <button class="mr-2" @click.prevent="$router.push(`/users/${follow.id}`)">
                                <img class="h-10 w-10 rounded-full" :src="follow.image_full_url" id="image-url">
                            </button>
                        </template>
                    </template>
                    <div class="self-center flex-1 flex">
                        <template v-if="$auth.user.id == follow.id">
                            <NuxtLink to="/user/account/profile" class="cursor-pointer">{{ follow.username }}</NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink :to="`/users/${follow.id}`" class="cursor-pointer">{{ follow.username }}</NuxtLink>
                        </template>
                    </div>
                    <div class="self-center space-x-2">
                        <template v-if="$auth.user.id == follow.id">
                            <NuxtLink to="/user/account/profile">view</NuxtLink>
                        </template>
                        <template v-else-if="follow.isFriend">
                            <button class="text-white bg-blue-400 hover:text-red-400 border border-gray-300 rounded py-0.5 px-2" @click.prevent="unFollow(follow.id)">
                                Following
                            </button>
                        </template>
                        <template v-else>
                            <button class="text-blue-400 font-semibold hover:text-blue-600" @click.prevent="followBack(follow.id)">
                                Follow
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',

    middleware: 'auth',

    head: {
        title: '| Following',
        meta: [
            { hid: 'description', name: 'description', content: 'Following' }
        ],
    },

    mounted() {
        this.getFollowing();
    },

    data() {
        return {
            noFollowingMessage: false,
            following: [],
        }
    },

    methods: {
        getFollowing() {
            this.$axios.$get(`api/users/following/${this.$route.params.id}`)
                .then((res) => {
                    if (res.friends.length == 0) {
                        this.noFollowingMessage = true;
                    }

                    this.following = res.friends;
                    
                    this.following.forEach(element => {
                        let numOfOccurrences = this.following.reduce(function (n, data) {
                            return  n + (data.id == element.id);
                        }, 0);

                        if (numOfOccurrences > 1) {
                            element.isFriend = true;
                            for (var a = this.following.length - 1; a >= 0; a--) {
                                if (this.following[a].id == element.id) {
                                    this.following.splice(a, 1);
                                    a = -1;
                                }
                            }
                        } else {
                            if (res.user_following.indexOf(element.id) !== -1) {
                                element.isFriend = true;
                            } else {
                                for (var b = this.following.length - 1; b >= 0; b--) {
                                    if (this.following[b].id == element.id) {
                                        this.following.splice(b, 1);
                                        b = -1;
                                    }
                                }
                            }
                        }
                    });

                    var followingFilter = this.following.filter((element) => {
                        return element.isFriend == true;
                    })

                    followingFilter.forEach(element => {
                        if (res.auth_user_following.indexOf(element.id) !== -1) {
                            element.isFriend = true;
                        } else {
                            element.isFriend = false;
                        }
                    })

                    if(followingFilter.length == 0) {
                        this.noFollowingMessage = true;
                    }

                    this.following = followingFilter;
                });
        },

        followBack(id) {
            this.$axios.$post(`/api/users/${id}`)
                .then(() => {
                    let following = this.following;
                    this.following = [];
                    let currentFollow = following.find(obj => {
                        return obj.id == id;
                    })
                    currentFollow.isFriend = true;
                    this.following  = following;
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/users/unfollow/${id}`)
                .then((res) => {
                    let following = this.following;
                    this.following = [];
                    let currentFollow = following.find(obj => {
                        return obj.id == id;
                    })
                    currentFollow.isFriend = false;
                    this.following  = following;
                })
        }
    }

}
</script>