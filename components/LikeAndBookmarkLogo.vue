<template>
    <div class="flex">
        <svg 
            :class="isLikedPost ? 'text-red-500' : 'text-gray-300'" 
            class="h-6 ml-4 cursor-pointer fill-current"
            @click.prevent="likeOrUnlikePost"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
        >
            <path d="M0 190.9v-5.8c0-69.9 50.52-129.52 119.4-141 44.7-7.59 92 7.27 124.6 39.92L256 96l11.1-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9z"/>
        </svg>
        <svg
            :class="isBookmarkedPost ? 'text-gray-500' : 'text-gray-300'" 
            class="h-6 ml-4 text-gray-300 cursor-pointer fill-current" 
            @click.prevent="bookmarkOrUnBookmarkPost" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 384 512"
        >
            <path d="M384 48v464L192 400 0 512V48C0 21.5 21.5 0 48 0h288c26.5 0 48 21.5 48 48z"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        slug: {
            type: String,
            default: ''
        }
    },

    mounted() {
        this.checkLikeAndBookmarkCondition();
    },

    data() {
        return {
            isLikedPost: false,
            isBookmarkedPost: false,
        }
    },

    methods: {
        checkLikeAndBookmarkCondition() {
            this.$axios.$get(`/api/posts/${this.slug}/${this.$auth.user.id}/get-like-and-bookmark-condition`)
                .then((res) => {
                    if (res.is_liked) {
                        this.isLikedPost = true;
                    }

                    if (res.is_bookmarked) {
                        this.isBookmarkedPost = true;
                    }
                })
        },

        async likeOrUnlikePost() {
            let data = {
                userId: this.$auth.user.id
            }

            if (!this.isLikedPost) {
                await this.$axios.$post(`/api/posts/${this.slug}/like`, data) 
                    .then(() => {
                        this.isLikedPost = !this.isLikedPost;
                    })
                return;
            } 

            await this.$axios.$delete(`/api/posts/${this.slug}/${data.userId}/like/delete`)
                .then(() => {
                    this.isLikedPost = !this.isLikedPost;
                })
        },

        async bookmarkOrUnBookmarkPost() {
            let data = {
                userId: this.$auth.user.id
            }

            if (!this.isBookmarkedPost) {
                await this.$axios.$post(`/api/posts/${this.slug}/bookmark`, data) 
                    .then(() => {
                        this.isBookmarkedPost = !this.isBookmarkedPost;
                    })
                return;
            } 

            await this.$axios.$delete(`/api/posts/${this.slug}/${data.userId}/bookmark/delete`)
                .then(() => {
                    this.isBookmarkedPost = !this.isBookmarkedPost;
                })
        },
    }
}
</script>