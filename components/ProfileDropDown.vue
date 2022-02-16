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
                <DropDownItem to="/user/account/profile" class="-mt-0" :class="{'bg-gray-300' : this.$nuxt.$route.path == '/user/account/profile'}">Profile</DropDownItem>
                <DropDownItem to="/user/liked" :class="{'bg-gray-300' : this.$nuxt.$route.path == '/user/liked'}">Liked</DropDownItem>
                <DropDownItem to="/user/bookmarked" :class="{'bg-gray-300' : this.$nuxt.$route.path == '/user/bookmarked'}">Bookmarked</DropDownItem>
                <DropDownItem to="/user/account/edit-profile" :class="{ 'bg-gray-300' : this.$nuxt.$route.path == '/user/account/edit-profile', 'bg-gray-300' : this.$nuxt.$route.path == '/user/account/change-password' }">Settings</DropDownItem>
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