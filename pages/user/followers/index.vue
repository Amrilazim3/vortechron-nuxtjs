<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-semibold">Followers</h2>
        <div class="h-1 mb-4 bg-gray-200 w-full"></div>
        <div v-if="noFollowersMessage" class="flex h-56 justify-center">
            <h2 class="text-2xl self-end">No followers yet</h2>
        </div>
        <div v-else v-for="follower in followers" :key="follower.id">
            <div class="bg-white mb-1.5 rounded-md">
                <div class="flex px-2 py-2 justify-between">
                    <template v-if="!follower.image_url">
                        <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${follower.id}`)">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </button>
                    </template>
                    <template v-else>
                        <button class="mr-2" @click.prevent="$router.push(`/users/${follower.id}`)">
                            <img class="h-10 w-10 rounded-full" :src="follower.image_full_url" id="image-url">
                        </button>
                    </template>
                    <div class="self-center flex-1 flex">
                        <NuxtLink :to="`/users/${follower.id}`" class="cursor-pointer">{{ follower.username }}</NuxtLink>
                    </div>
                    <div class="self-center space-x-2">
                        <template v-if="follower.isFriend">
                            <button class="text-red-400 font-semibold hover:text-red-600" @click.prevent="unFollow(follower.id)">
                                Unfollow
                            </button>
                        </template>
                        <template v-else>
                            <button class="text-blue-400 font-semibold hover:text-blue-600" @click.prevent="follow(follower.id)">
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
        title: '| Followers',
        meta: [
            { hid: 'description', name: 'description', content: 'Followers' }
        ],
    },

    mounted() {
        this.getFollowers();
    },

    data() {
        return {
            noFollowersMessage: false,
            followers: [],
        }
    },

    methods: {
        getFollowers() {
            this.$axios.$get('api/user/followers')
                .then((res) => {
                    if (res.friends.length == 0) {
                        this.noFollowersMessage = true;
                    }

                    this.followers = res.friends;
                    
                    this.followers.forEach(element => {
                        let numOfOccurrences = this.followers.reduce(function (n, data) {
                            return  n + (data.id == element.id);
                        }, 0);

                        if (numOfOccurrences > 1) {
                            element.isFriend = true;
                            for (var a = this.followers.length - 1; a >= 0; a--) {
                                if (this.followers[a].id == element.id) {
                                    this.followers.splice(a, 1);
                                    a = -1;
                                }
                            }
                        } else {
                            element.isFriend = false;
                            if (res.followers.indexOf(element.id) == -1) {
                                for (var b = this.followers.length - 1; b >= 0; b--) {
                                    if (this.followers[b].id == element.id) {
                                        this.followers.splice(b, 1);
                                        b = -1;
                                    }
                                }
                            }
                        }
                    });

                    if (this.followers.length == 0) {
                        this.noFollowersMessage = true;
                    }

                    console.log(this.followers);
                });
        },

        follow(id) {
            this.$axios.$post(`/api/user/followers/${id}`)
                .then(() => {
                    let followers = this.followers;
                    this.followers = [];
                    let currentFollower = followers.find(obj => {
                        return obj.id == id;
                    })
                    currentFollower.isFriend = true;
                    this.followers  = followers;
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/user/followers/unfollow/${id}`)
                .then((res) => {
                    let followers = this.followers;
                    this.followers = [];
                    let currentFollower = followers.find(obj => {
                        return obj.id == id;
                    })
                    currentFollower.isFriend = false;
                    this.followers  = followers;
                })
        }

    }

}
</script>