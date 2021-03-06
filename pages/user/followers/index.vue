<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-normal">Followers</h2>
        <div class="h-1 mb-4 bg-gray-200 w-full"></div>
        <div v-if="noFollowersMessage" class="flex h-56 justify-center">
            <h2 class="text-2xl self-end">No followers yet</h2>
        </div>
        <div v-else>
            <div v-for="follower in followers" :key="follower.id" class="bg-white mb-1.5 rounded-md">
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
                        <template v-if="followingIds.includes(follower.id)">
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
            <div v-if="followers.length" v-observe-visibility="handleScrolledToBottom"></div>
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
        this.getFollowers(this.page);
    },

    data() {
        return {
            noFollowersMessage: false,
            followers: [],
            followingIds: [],
            page: 1,
            lastPage: 1,
        }
    },

    methods: {
        getFollowers(page) {
            this.$axios.$get(`api/user/followers?page=${page}`)
                .then(({ followers, following_ids }) => {
                    if (followers.data.length == 0) {
                        this.noFollowersMessage = true;
                    }
                    this.lastPage = followers.meta.last_page;
                    this.followingIds.push(...Object.values(following_ids.data));
                    this.followers.push(...Object.values(followers.data));
                });
        },

        follow(id) {
            this.$axios.$post(`/api/user/followers/${id}`)
                .then(() => {
                    this.followingIds.splice(id, 0, id);
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/user/followers/unfollow/${id}`)
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