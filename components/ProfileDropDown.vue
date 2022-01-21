<template>
    <DropDown>
        <template slot="trigger">
            <div class="mt-2 sm:-mt-0">
                <template v-if="!this.$auth.user.image_url">
                    <div class="flex">
                        <button class="bg-gray-300 border rounded-full p-1.5 mr-2" @click="toggleProfile">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                        </button>
                        <button class="text-sm" @click="toggleProfile">
                            {{ this.$auth.user.username }}
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="flex">
                        <button class="bg-gray-300 border rounded-full p-1.5 mr-2" @click="toggleProfile">
                            <img src="https://picsum.photos/20" alt="" class="h-5">
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
                <DropDownItem to="/user/profile" :class="{'bg-gray-300' : this.$nuxt.$route.path == '/user/profile'}">Profile</DropDownItem>
                <DropDownItem to="/user/likes" :class="{'bg-gray-300' : this.$nuxt.$route.path == '/user/likes'}">Likes</DropDownItem>
                <DropDownItem to="/user/bookmarks" :class="{'bg-gray-300' : this.$nuxt.$route.path == '/user/bookmarks'}">Bookmarks</DropDownItem>
                <button class="px-1 max-w-min mt-4 hover:text-red-500" @click="logout">Logout</button>
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

        logout() {
            this.$auth.logout()
        }
    },
}
</script>