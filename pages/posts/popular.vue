<template>
    <section class="grid p-6 pt-56 sm:pt-44 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:pt-36 xl:max-w-5xl 2xl:max-w-7xl">
        <h1 class="my-8 text-4xl font-normal text-center">Popular Posts</h1>
            
        <DisplayPosts :noPost="noPost" :posts="posts" :currentUserId="currentUserId">
            <div slot="scroll-handler" v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>  
            <p slot="no-post-message" class="mt-24 text-lg font-normal text-center">No popular posts yet...</p>      
        </DisplayPosts>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

export default {
    components: {
        VueMomentsAgo
    },
    
    head: {
        title: '| Popular Posts',
        meta: [
            { hid: 'description', name: 'description', content: 'show popular posts' }
        ],
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
        this.getPopularPost(this.page)
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
        getPopularPost(page) {
            this.$axios.$get(`/api/posts/popular?page=${page}`)
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
            this.getPopularPost(this.page);
        },
    }
}
</script>