<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h1 class="my-4 text-4xl font-normal text-center">Bookmarked Posts</h1>
        
        <DisplayPosts :noPost="noPost" :posts="posts" :currentUserId="currentUserId">
            <div slot="scroll-handler" v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>  
            <p slot="no-post-message" class="mt-24 text-lg font-normal text-center">No bookmarked posts yet...</p>    
        </DisplayPosts>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

export default {
    layout: 'hide-subnav',
    
    components: {
        VueMomentsAgo
    },

    middleware: 'auth',

    head: {
        title: '| Bookmarked Posts',
        meta: [
            { hid: 'description', name: 'description', content: 'show all user bookmarked posts' }
        ],
    },

    
    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
        this.getBookmarkedPosts(this.page)
    },

    data() {
        return {
            page: 1,
            lastPage: 2,
            posts: [],
            currentUserId: null,
            noPost: false,
        }
    },

    methods: {
        getBookmarkedPosts(page) {
            this.$axios.$get(`/api/user/bookmarked/posts?page=${page}`)
                .then(({ posts }) => {
                    if (posts.length == 0) {
                        this.lastPage = this.page;
                        if (this.page == 1) {
                            this.noPost = true;
                        }
                    }
                    this.posts.push(...posts);
                })
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.lastPage++;
            this.getBookmarkedPosts(this.page);
        },
    }
}
</script>