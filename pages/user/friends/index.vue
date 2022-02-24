<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 class="text-2xl font-semibold">Friends</h2>
        <div class="h-1 mb-4 bg-gray-200 w-full"></div>
        <div v-if="noFriendMessage" class="flex h-56 justify-center">
            <h2 class="text-2xl self-end">No friends yet</h2>
        </div>
        <div v-else v-for="friend in friends" :key="friend.id">
            <div class="bg-white mb-1.5 rounded-md">
                <div class="flex px-2 py-2 justify-between">
                    <template v-if="!friend.image_url">
                        <button class="mr-2 bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/user/friends/${friend.id}`)">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </button>
                    </template>
                    <template v-else>
                        <button class="mr-2" @click.prevent="$router.push(`/user/friends/${friend.id}`)">
                            <img class="h-10 w-10 rounded-full" :src="friend.image_full_url" id="image-url">
                        </button>
                    </template>
                    <div class="self-center flex-1 flex">
                        <NuxtLink :to="`/user/friends/${friend.id}`" class="hover:underline cursor-pointer">{{ friend.username }}</NuxtLink>
                        <template v-if="friend.isFollower && !friend.isFollowing">
                            <button class="text-blue-400 font-semibold ml-2 hover:text-blue-600" @click.prevent="followBack(friend.id)">
                                <li class="list-disc">
                                    Follow
                                </li>
                            </button>
                        </template>
                    </div>
                    <div class="self-center space-x-2">
                        <template v-if="friend.isSendFriendRequest">
                                <button class="text-gray-500 font-semibold hover:underline" @click.prevent="cancelRequest(friend.id)">
                                    Requested
                                </button>
                        </template>
                        <template>
                            <button class="text-red-500 font-semibold hover:underline" @click="modalData = friend; isModalShow = true;">
                                Remove
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{'hidden': !isModalShow}" class="modal" @click="isModalShow = false" :id="modalData.username">
            <div class="modal-content">
                <div class="p-6">
                    <div class="flex justify-between">
                        <div></div>
                        <button  @click.prevent="isModalShow = false">
                            <img src="~/assets/xmark-solid.svg" alt="" class="h-4">
                        </button>
                    </div>
                    <template v-if="!modalData.image_url">
                        <div class="mx-auto max-w-max bg-gray-300 p-2.5 rounded-full">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </div>
                    </template>
                    <template v-else>
                        <div>
                            <img class="h-10 w-10 rounded-full mx-auto" :src="modalData.image_full_url" id="image-url">
                        </div>
                    </template>
                    <p class="text-center font-semibold">Remove friend?</p>
                    <p class="mb-4 text-center">this user will be remove from your friend lists.</p>
                    <button class="w-full bg-red-200 hover:bg-red-400 border border-red-500 rounded-md py-1.5 mb-2.5" @click.prevent="deleteFriend">Remove</button>
                    <button class="w-full bg-gray-200 border border-gray-400 hover:bg-gray-400 rounded-md py-1.5" @click.prevent="isModalShow = false">Cancel</button>
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
        title: '| Friends',
        meta: [
            { hid: 'description', name: 'description', content: 'Friends' }
        ],
    },

    mounted() {
        this.getFriends();
    },

    data() {
        return {
            noFriendMessage: false,
            isFriendWithUser: [],
            friends: [],

            modalData: {},
            isModalShow: false
        }
    },

    methods: {
        getFriends() {
            this.$axios.$get('api/user/friends')
                .then((res) => {
                    if (res.friends.length == 0) {
                        this.noFriendMessage = true;
                    }
                    this.friends = res.friends

                    this.friends.forEach(element => {
                        let numOfOccurrences = this.friends.reduce(function (n, data) {
                            return  n + (data.id == element.id);
                        }, 0);

                        if (numOfOccurrences > 1) {
                            element.isFollower = true;
                            element.isFollowing = true;
                            element.isSendFriendRequest = false;

                            for (var i = this.friends.length - 1; i >= 0; i--) {
                                if (this.friends[i].id == element.id) {
                                    this.friends.splice(i, 1);
                                    i = -1;
                                }
                            }
                        } else if (res.followers.indexOf(element.id) !== -1) {
                            element.isFollower = true;
                            element.isFollowing = false;
                            element.isSendFriendRequest = false;
                        } else if (res.following.indexOf(element.id) !== -1) {
                            element.isFollower = false;
                            element.isFollowing = true;
                            element.isSendFriendRequest = false;
                        } 
                        
                        if (res.friend_request_sent_to.indexOf(element.id) !== -1) {
                            element.isSendFriendRequest = true;
                            element.isFollowing = true;
                        } 

                    });
                })
        },

        followBack(id) {
            this.$axios.$post(`/api/user/friends/${id}`)
                .then(() => {
                    let newFriends = this.friends;
                    this.friends = [];
                    let currentUser = newFriends.find(obj => {
                        return obj.id == id;
                    })
                    currentUser.isSendFriendRequest = true;
                    currentUser.isFollowing = true;

                    this.friends  = newFriends;
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        cancelRequest(id) {
            this.$axios.$delete(`/api/user/friends/cancel-request/${id}`)
                .then(() => {
                    let newFriends = this.friends;
                    this.friends = [];
                    let currentUser = newFriends.find(obj => {
                        return obj.id == id;
                    })
                    currentUser.isSendFriendRequest = false;
                    currentUser.isFollowing = false;

                    this.friends  = newFriends;
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        deleteFriend() {
            const id = this.modalData.id

            this.$axios.$delete(`/api/user/friends/${id}`)
                .then(() => {
                    let newFriends = this.friends;
                    this.friends = [];
                    let currentUser = newFriends.filter(obj => {
                        return obj.id !== id;
                    })
                    
                    this.friends = currentUser;
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // nextPage() {
        //     this.$axios.$get('api/user/friends?page=2')
        //         .then((res) => {
        //             console.log(res);
        //         })
        // }
    }

}
</script>

<style>
.modal {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.75);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s;
}
.modal-content {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
}
</style>