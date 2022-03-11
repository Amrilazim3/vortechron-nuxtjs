<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-normal">Friends</h2>
        <div class="h-1 mb-4 bg-gray-200 w-full"></div>
        <div v-if="noFriendMessage" class="flex h-56 justify-center">
            <h2 class="text-2xl self-end">No friends yet</h2>
        </div>
        <div v-else v-for="friend in friends" :key="friend.id">
            <div class="bg-white mb-1.5 rounded-md">
                <div class="flex px-2 py-2 justify-between">
                    <template v-if="!friend.image_url">
                        <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${friend.id}`)">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </button>
                    </template>
                    <template v-else>
                        <button class="mr-2" @click.prevent="$router.push(`/users/${friend.id}`)">
                            <img class="h-10 w-10 rounded-full" :src="friend.image_full_url" id="image-url">
                        </button>
                    </template>
                    <div class="self-center flex-1 flex">
                        <NuxtLink :to="`/users/${friend.id}`" class="cursor-pointer">{{ friend.username }}</NuxtLink>
                    </div>
                    <div class="self-center space-x-2">
                        <template v-if="friend.isFriend">
                            <button class="text-red-400 font-semibold hover:text-red-600" @click.prevent="unFollow(friend.id)">
                                Unfollow
                            </button>
                        </template>
                        <template v-else>
                            <button class="text-blue-400 font-semibold hover:text-blue-600" @click.prevent="follow(friend.id)">
                                Follow
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="friends.length" v-observe-visibility="handleScrolledToBottom"></div>
    </section>
</template>

<script>
export default {
    layout: 'hide-subnav',

    middleware: 'auth',

    head: {
        title: '| Friends',
        meta: [
            { hid: 'description', name: 'description', content: 'Friends' }
        ],
    },

    mounted() {
        this.getFriends(this.page);
    },

    data() {
        return {
            noFriendMessage: false,
            friends: [],
            page: 1,
            lastPage: 1,
        }
    },

    methods: {
        getFriends(page) {
            this.$axios.$get(`api/user/friends?page=${page}`)
                .then(({ friends }) => {
                    if (friends.data.length == 0) {
                        this.noFriendMessage = true;
                        return;
                    } 
                    
                    this.lastPage = friends.last_page;
                    this.friends.push(...Object.values(friends.data));

                    this.friends.forEach(element => {
                        element.isFriend = true;
                    });
                });
        },

        follow(id) {
            this.$axios.$post(`/api/user/friends/${id}`)
                .then(() => {
                    let friends = this.friends;
                    this.friends = [];
                    let currentFriend = friends.find(obj => {
                        return obj.id == id;
                    })
                    currentFriend.isFriend = true;
                    this.friends  = friends;
                })
        },

        unFollow(id) {
            this.$axios.$delete(`/api/user/friends/unfollow/${id}`)
                .then(() => {
                    let friends = this.friends;
                    this.friends = [];
                    let currentFriend = friends.find(obj => {
                        return obj.id == id;
                    })
                    currentFriend.isFriend = false;
                    this.friends  = friends;
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.getFriends(this.page);                
        },

    }

}
</script>