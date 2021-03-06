<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-normal">Following</h2>
        <div class="h-1 mb-4 bg-gray-200 w-full"></div>
        <div v-if="noFollowingMessage" class="flex h-56 justify-center">
            <h2 class="text-2xl self-end">No following yet</h2>
        </div>
        <div v-else>
            <div v-for="follow in following" :key="follow.id">
                <div class="bg-white mb-1.5 rounded-md">
                    <div class="flex px-2 py-2 justify-between">
                        <template v-if="!follow.image_url">
                            <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${follow.id}`)">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                        <template v-else>
                            <button class="mr-2" @click.prevent="$router.push(`/users/${follow.id}`)">
                                <img class="h-10 w-10 rounded-full" :src="follow.image_full_url" id="image-url">
                            </button>
                        </template>
                        <div class="self-center flex-1 flex">
                            <NuxtLink :to="`/users/${follow.id}`" class="cursor-pointer">{{ follow.username }}</NuxtLink>
                        </div>
                        <div class="self-center space-x-2">
                            <template v-if="followingIds.includes(follow.id)">
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
            <div v-if="following.length" v-observe-visibility="handleScrolledToBottom"></div>
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
        this.getFollowing(this.page);
    },

    data() {
        return {
            noFollowingMessage: false,
            following: [],
            followingIds: [],
            page: 1,
            lastPage: 1,
        }
    },

    methods: {
        async getFollowing(page) {
            await this.$axios.$get(`api/user/following?page=${page}`)
                .then(({ following, following_ids }) => {
                    if (following.data.length == 0) {
                        this.noFollowingMessage = true;
                    }
                    this.lastPage = following.meta.last_page;
                    this.followingIds.push(...Object.values(following_ids.data));
                    this.following.push(...Object.values(following.data));
                });
        },

        followBack(id) {
            this.$axios.$post(`/api/user/following/${id}`)
                .then(() => {
                    this.followingIds.splice(id, 0, id);
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/user/following/unfollow/${id}`)
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
            this.getFollowing(this.page);                
        },

    }

}
</script>