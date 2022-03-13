<template>
    <DropDown>
        <template slot="trigger">
            <div class="mt-2 sm:-mt-0">
                <template v-if="!this.$auth.user.image_url">
                    <div class="flex">
                        <button class="p-1.5 mr-2" @click="toggleProfile">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </button>
                        <button class="text-sm" @click="toggleProfile">
                            {{ this.$auth.user.username }}
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="flex">
                        <button @click="toggleProfile">
                            <img :src="this.$auth.user.image_full_url" alt="" class="h-8 w-8 rounded-full mr-2">
                        </button>
                        <button class="text-sm" @click="toggleProfile">
                            {{ this.$auth.user.username }}
                        </button>
                    </div>
                </template>
            </div>
        </template>

        <template>
            <div v-if="openProfile" class="absolute z-50 flex flex-col w-40 py-2 px-1 mt-2 overflow-auto bg-white rounded-xl max-h-28 sm:max-h-36">
                <div class="relative flex hover:bg-gray-200 focus:bg-gray-400 rounded-md">
                    <DropDownItem to="/user/account/profile" :class="{'bg-gray-300 hover:bg-gray-200 rounded-md' : this.$nuxt.$route.path == '/user/account/profile'}">Profile</DropDownItem>
                    <img src="~/assets/profile-logo.svg" alt="" class="h-4 absolute mt-1.5 ml-14 cursor-pointer opacity-50" @click="$router.push('/user/account/profile')">
                </div>
                <div class="relative flex hover:bg-gray-200 focus:bg-gray-400 rounded-md">
                    <DropDownItem to="/user/friends" :class="{'bg-gray-300 hover:bg-gray-200 rounded-md' : this.$nuxt.$route.path == '/user/friends'}">Friends</DropDownItem>
                    <img src="~/assets/friends-logo.svg" alt="" class="h-4 absolute mt-1.5 ml-16 cursor-pointer opacity-50" @click="$router.push('/user/friends')">
                </div>
                <div class="relative flex hover:bg-gray-200 focus:bg-gray-400 rounded-md">
                    <DropDownItem to="/user/liked" :class="{'bg-gray-300 hover:bg-gray-200 rounded-md' : this.$nuxt.$route.path == '/user/liked'}">Liked</DropDownItem>
                    <img src="~/assets/heart-logo.svg" alt="" class="h-4 absolute mt-1.5 ml-12 cursor-pointer opacity-50" @click="$router.push('/user/liked')">
                </div>
                <div class="relative flex hover:bg-gray-200 focus:bg-gray-400 rounded-md">
                    <DropDownItem to="/user/bookmarked" :class="{'bg-gray-300 hover:bg-gray-200 rounded-md' : this.$nuxt.$route.path == '/user/bookmarked'}">Bookmarked</DropDownItem>
                    <img src="~/assets/bookmark-logo.svg" alt="" class="h-4 absolute mt-1.5 ml-24 pl-1.5 cursor-pointer opacity-50" @click="$router.push('/user/bookmarked')">
                </div>
                <div class="relative flex hover:bg-gray-200 focus:bg-gray-400 rounded-md">
                    <DropDownItem to="/user/account/profile/edit-profile" :class="{ 'bg-gray-300 hover:bg-gray-200 rounded-md' : this.$nuxt.$route.path == '/user/account/profile/edit-profile' || this.$nuxt.$route.path == '/user/account/change-password' }">Settings</DropDownItem>
                    <img src="~/assets/gear-logo.svg" alt="" class="h-4 absolute mt-1.5 ml-16 pl-1 cursor-pointer opacity-50" @click="$router.push('/user/bookmarked')">
                </div>

                <button class="flex px-1 mt-4 hover:text-red-500" @click="signOut">sign out</button>
            </div>
        </template>
    </DropDown>
</template>

<script>
export default {
    data: () => ({
        openProfile: false,
    }),

    methods: {
        toggleProfile() {
            if (this.openProfile) {
                return this.hideProfile()
            }
            return this.showProfile()
        },

        showProfile() {
            this.openProfile = true;
            setTimeout(() => document.addEventListener('click', this.hideProfile), 0);
        },

        hideProfile() {
            this.openProfile = false;
            document.removeEventListener('click', this.hideProfile);
        },

        signOut() {
            this.$auth.logout()
        }
    },
}
</script>