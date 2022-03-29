<template>
    <section class="grid p-6 pt-56 sm:pt-44 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:pt-36 xl:max-w-5xl 2xl:max-w-7xl">
        <h1 class="my-8 text-4xl font-normal text-center">Latest Posts</h1>

        <DisplayPosts :noPost="noPost" :posts="posts" :currentUserId="currentUserId">
            <div slot="scroll-handler" v-if="posts.length" v-observe-visibility="handleScrolledToBottom"></div>    
        </DisplayPosts>
            
    </section>
</template>

<script>
export default {    
    head: {
        title: '| Latest Posts',
        meta: [
            { hid: 'description', name: 'description', content: 'show latest posts' }
        ],
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
        }
        this.getLatestPost(this.page)
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
        getLatestPost(page) {
            this.$axios.$get(`/api/posts/latest?page=${page}`)
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
            this.getLatestPost(this.page);
        },
    }
}
</script>