<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h1 class="my-4 text-4xl font-normal text-center">Liked Posts</h1>
            
        <DisplayPosts :noPost="noPost" :posts="posts" :currentUserId="currentUserId">
            <div slot="scroll-handler" v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>  
            <p slot="no-post-message" class="mt-24 text-lg font-normal text-center">No liked posts yet...</p>    
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
        title: '| Liked Posts',
        meta: [
            { hid: 'description', name: 'description', content: 'show all user liked posts' }
        ],
    },

    
    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
        this.getLikedPosts(this.page)
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
        getLikedPosts(page) {
            this.$axios.$get(`/api/user/liked/posts?page=${page}`)
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
            this.getLikedPosts(this.page);
        },
    }
}
</script>