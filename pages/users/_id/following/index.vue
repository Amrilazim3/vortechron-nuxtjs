<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-normal">{{ username }}'s following</h2>
        <div class="w-full h-1 mb-4 bg-gray-200"></div>
        <div v-if="noFollowingMessage" class="flex justify-center h-56">
            <h2 class="self-end text-2xl">No following yet</h2>
        </div>
        <div v-else>
            <div v-for="follow in following" :key="follow.id" class="bg-white mb-1.5 rounded-md">
                <div class="flex justify-between px-2 py-2">
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
                                <img class="w-10 h-10 rounded-full" :src="follow.image_full_url" id="image-url">
                            </button>
                        </template>
                        <template v-else>
                            <button class="mr-2" @click.prevent="$router.push(`/users/${follow.id}`)">
                                <img class="w-10 h-10 rounded-full" :src="follow.image_full_url" id="image-url">
                            </button>
                        </template>
                    </template>
                    <div class="flex self-center flex-1">
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
                        <template v-else-if="followingIds.includes(follow.id)">
                            <button class="text-white bg-blue-400 hover:text-red-400 border border-gray-300 rounded py-0.5 px-2" @click.prevent="unFollow(follow.id)">
                                Following
                            </button>
                        </template>
                        <template v-else>
                            <button class="font-semibold text-blue-400 hover:text-blue-600" @click.prevent="followBack(follow.id)">
                                Follow
                            </button>
                        </template>
                    </div>
                </div>
            </div>
            <div v-if="following.length" v-observe-visibility="handleScrolledToBottom"></div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',

    middleware: 'auth',

    head() {
        return {
            title: '| ' + this.username + '`s following',
            meta: [
                { hid: 'description', name: 'description', content: 'Following' }
            ],
        }
    },

    mounted() {
        if (this.$auth.user.id == this.$route.params.id) {
            this.$router.push('/user/account/profile');
        }
        this.getFollowing(this.page);
    },

    data() {
        return {
            username: '',
            noFollowingMessage: false,
            following: [],
            followingIds: [],
            page: 1,
            lastPage: 1,
        }
    },

    methods: {
        getFollowing(page) {
            this.$axios.$get(`api/users/following/${this.$route.params.id}?page=${page}`)
                .then(({ following, following_ids, username }) => {
                    this.username = username;

                    if (following.data.length == 0) {
                        this.noFollowingMessage = true;
                    }
                    this.lastPage = following.meta.last_page;
                    this.followingIds.push(...Object.values(following_ids));
                    this.following.push(...Object.values(following.data));
                });
        },

        followBack(id) {
            this.$axios.$post(`/api/users/${id}`)
                .then(() => {
                    this.followingIds.splice(id, 0, id);
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/users/unfollow/${id}`)
                .then((res) => {
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
            this.getFollowing(this.page);                
        },
    }

}
</script>