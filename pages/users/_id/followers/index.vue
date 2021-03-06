<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-normal">{{ username }}'s followers</h2>
        <div class="w-full h-1 mb-4 bg-gray-200"></div>
        <div v-if="noFollowersMessage" class="flex justify-center h-56">
            <h2 class="self-end text-2xl">No followers yet</h2>
        </div>
        <div v-else>
            <div v-for="follower in followers" :key="follower.id" class="bg-white mb-1.5 rounded-md">
                <div class="flex justify-between px-2 py-2">
                    <template v-if="!follower.image_url">
                        <template v-if="$auth.user.id == follower.id">
                            <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push('/user/account/profile')">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                        <template v-else>
                            <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${follower.id}`)">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="$auth.user.id == follower.id">
                            <button class="mr-2" @click.prevent="$router.push('/user/account/profile')">
                                <img class="w-10 h-10 rounded-full" :src="follower.image_full_url" id="image-url">
                            </button>
                        </template>
                        <template v-else>
                            <button class="mr-2" @click.prevent="$router.push(`/users/${follower.id}`)">
                                <img class="w-10 h-10 rounded-full" :src="follower.image_full_url" id="image-url">
                            </button>
                        </template>
                    </template>
                    <div class="flex self-center flex-1">
                        <template v-if="$auth.user.id == follower.id">
                            <NuxtLink to="/user/account/profile" class="cursor-pointer">{{ follower.username }}</NuxtLink>
                        </template>
                        <template v-else>
                            <NuxtLink :to="`/users/${follower.id}`" class="cursor-pointer">{{ follower.username }}</NuxtLink>
                        </template>
                    </div>
                    <div class="self-center space-x-2">
                        <template v-if="$auth.user.id == follower.id">
                            <NuxtLink to="/user/account/profile">view</NuxtLink>
                        </template>
                        <template v-else-if="followingIds.includes(follower.id)">
                            <button class="font-semibold text-red-400 hover:text-red-600" @click.prevent="unFollow(follower.id)">
                                Unfollow
                            </button>
                        </template>
                        <template v-else>
                            <button class="font-semibold text-blue-400 hover:text-blue-600" @click.prevent="follow(follower.id)">
                                Follow
                            </button>
                        </template>
                    </div>
                </div>
            </div>
            <div v-if="followers.length" v-observe-visibility="handleScrolledToBottom"></div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',

    middleware: 'auth',

    head() {
        return {
            title: '| ' + this.username + '`s followers',
            meta: [
                { hid: 'description', name: 'description', content: 'User Followers' }
            ],
        }
    },

    mounted() {
        if (this.$auth.user.id == this.$route.params.id) {
            this.$router.push('/user/account/profile');
        }
        this.getFollowers(this.page);
    },

    data() {
        return {
            username: '',
            noFollowersMessage: false,
            followers: [],
            followingIds: [],
            page: 1,
            lastPage: 1,
        }
    },

    methods: {
        getFollowers(page) {
            this.$axios.$get(`api/users/followers/${this.$route.params.id}?page=${page}`)
                .then(({ followers, following_ids, username }) => {
                    this.username = username;

                    if (followers.data.length == 0) {
                        this.noFollowersMessage = true;
                    }
                    this.lastPage = followers.meta.last_page;
                    this.followingIds.push(...Object.values(following_ids));
                    this.followers.push(...Object.values(followers.data));
                });
        },

        follow(id) {
            this.$axios.$post(`/api/users/${id}`)
                .then(() => {
                    this.followingIds.splice(id, 0, id);
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/users/unfollow/${id}`)
                .then(() => {
                    let index = this.followingIds.indexOf(id);
                    if (index > -1) {
                        this.followingIds.splice(index, 1);
                    }
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.getFollowers(this.page);                
        },

    }

}
</script>