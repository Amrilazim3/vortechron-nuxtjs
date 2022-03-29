<template>
    <section class="grid p-6 pt-56 sm:pt-44 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:pt-36 xl:max-w-5xl 2xl:max-w-7xl" :class="this.$auth.loggedIn && !this.$auth.user.email_verified_at && !this.$auth.user.service ? 'pt-72 sm:pt-64 xl:pt-56' : '' ">
        <h1 class="my-8 text-4xl font-normal text-center">{{ this.$route.params.slug }}'s posts</h1>

        <DisplayPosts :noPost="noPost" :posts="posts" :currentUserId="currentUserId">
            <div slot="scroll-handler" v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>  
            <p slot="no-post-message" class="mt-24 text-lg font-normal text-center">No posts yet with this category...</p>    
        </DisplayPosts>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

export default {
    components: {
        VueMomentsAgo
    },
    
    head() {
        return {
            title: '| ' + this.$route.params.slug,
            meta: [
                { hid: 'description', name: 'description', content: 'show all posts by single category' }
            ],
        }
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
        this.getPostsCategory(this.page)
    },

    data() {
        return {
            page: 1,
            lastPage: 1,
            posts: [],
            currentUserId: null,
            noPost: false,
        }
    },

    methods: {
        getPostsCategory(page) {
            this.$axios.$get(`/api/posts/categories/${this.$route.params.slug}?page=${page}`)
                .then(({ posts }) => {
                    if (posts.data.length == 0) {
                        this.noPost = true;
                    }
                    this.lastPage = posts.meta.last_page;
                    this.posts.push(...posts.data);
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.getPostsCategory(this.page);
        },
    }
}
</script>