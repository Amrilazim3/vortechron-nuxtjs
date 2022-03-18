<template>
    <DropDown>
        <template slot="trigger">
            <button @click.prevent="toggleOptions()">
                <img src="~/assets/ellipsis-vertical-solid.svg" alt="" class="h-6">
            </button>
        </template>

        <!-- show the lists -->
        <template>
            <div v-if="openOptions" class="absolute z-50 flex flex-col w-full px-2 py-2 overflow-auto bg-gray-100 rounded-md min-w-min">
                <DropDownItem :to="`/user/posts/edit/${slug}`">Edit</DropDownItem>
                <button class="hover:text-red-500" @click.prevent="deletePost">Delete</button>
            </div>
        </template>
    </DropDown>
</template>

<script>
export default {
    props: {
        slug: {
            type: String,
            default: ''
        }
    },

    data: () => ({
        openOptions: false,
    }),

    methods: {
        async deletePost() {
            let answer = confirm("Are you sure to delete this post?");

            if (answer) {
                await this.$axios.$delete(`/api/user/posts/${this.slug}/delete`)
                    .then(() => {
                        this.$store.dispatch('message/addNotification', {
                            type: 'red',
                            message: 'Post deleted'
                        }, {root:true});
                        this.$router.back();
                    })
            }
        },

        toggleOptions() {
            if (this.openOptions) {
                return this.hideOptions()
            }
            return this.showOptions()
        },

        showOptions() {
            this.openOptions = true;
            setTimeout(() => document.addEventListener('click', this.hideOptions), 0);
        },

        hideOptions() {
            this.openOptions = false;
            document.removeEventListener('click', this.hideOptions);
        }
    },
}
</script>