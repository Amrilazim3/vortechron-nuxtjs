<template>
    <section>
        <template v-if="$auth.loggedIn">
            <div class="w-full p-4 mt-16 bg-white rounded-md">
                <div class="flex">
                    <template v-if="!this.$auth.user.image_url">
                        <div class="bg-gray-300 p-2.5 rounded-full">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="w-5">
                        </div>
                    </template>
                    <template v-else>
                        <img class="w-10 h-10 rounded-full" :src="this.$auth.user.image_full_url" id="image-url">
                    </template>
                    <p class="ml-2.5 self-center">{{ this.$auth.user.username }}</p>
                </div>
                <ValidationObserver ref="commentObserver" tag="div" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(submitComment)">
                        <ValidationProvider tag="div" vid="comment" name="Comment" rules="required|max:500" v-slot="{ errors }">
                            <quill-editor 
                                class="mt-5"
                                v-model="commentForm.comment"
                                :options="editorOption"
                                data-v-560ba45dz
                            />
                            <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                        </ValidationProvider>
                        <div class="flex justify-between">
                            <div></div>
                            <BlueButton type="submit" id="submit" class="mt-3">
                                SUBMIT
                            </BlueButton>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </template>
        <template v-else>
            <div class="w-full p-4 mt-16 bg-white rounded-md">
                <p><NuxtLink to="/auth/sign-in" class="text-blue-400 hover:underline">sign in</NuxtLink> to comment</p>
            </div>
        </template>

        <div v-for="comment in comments" :key="comment.user_id" class="w-full p-4 mt-6 bg-gray-200 rounded-md">
            <template v-if="$auth.loggedIn && currentUserId == comment.user_id">
                <div class="flex justify-between">
                    <div class="flex">
                        <template v-if="!comment.image_url">
                            <button @click.prevent="$router.push('/user/account/profile')">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="w-5">
                            </button>
                        </template>
                        <template v-else>
                            <button @click.prevent="$router.push('/user/account/profile')">
                                <img class="w-10 h-10 rounded-full" :src="comment.image_full_url" id="image-url">
                            </button>
                        </template>
                        <NuxtLink to="/user/account/profile" class="ml-2.5 self-center">{{ comment.username }}</NuxtLink>
                    </div>
                    <button @click.prevent="deleteComment(comment.id)" class="self-center font-thin text-red-500 hover:underline">
                        delete
                    </button>
                </div>
            </template>
            <template v-else>
                <div class="flex">
                    <template v-if="!comment.image_url">
                        <button @click.prevent="$router.push(`/users/${comment.user_id}`)">
                            <img src="~/assets/default-profile-icon.svg" alt="" class="w-5">
                        </button>
                    </template>
                    <template v-else>
                        <button @click.prevent="$router.push(`/users/${comment.user_id}`)">
                            <img class="w-10 h-10 rounded-full" :src="comment.image_full_url" id="image-url">
                        </button>
                    </template>
                    <NuxtLink :to="`/users/${comment.user_id}`" class="ml-2.5 self-center">{{ comment.username }}</NuxtLink>
                </div>
            </template>
            <div class="w-full mt-4 h-0.5 bg-white"></div>
            <p class="mt-2" v-html="comment.body">{{ comment.body }}</p>
            <VueMomentsAgo prefix="comment" suffix="ago" :date="comment.created_at" lang="en" class="text-sm font-normal" />
        </div>
        <div v-if="comments.length" v-observe-visibility="handleScrolledToBottom"></div>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor';

export default {
    props: {
        postId: {
            type: Number,
            default: 0
        }
    },
    
    components: {
        quillEditor,
        VueMomentsAgo
    },

    mounted() {
        if (this.$auth.loggedIn) {
            this.currentUserId = this.$auth.user.id;
            this.commentForm.userId = this.$auth.user.id;
        }
        
        this.getComments(this.page);
    },


    data() {
        return {
            commentForm: {
                comment: '',
                userId: null,
            },

            currentUserId: null,
            page: 1,
            lastPage: 1,
            comments: [],
            noComments: false,

            editorOption: {
                debug: null,
                placeholder: 'Give this post a comment!',
                readOnly: true,
                theme: 'snow'
            },
        }
    },

    methods: {
        async getComments(page) {
            if (this.$route.params.slug) {
                await this.$axios.$get(`/api/comments/${this.$route.params.slug}?page=${page}`)
                    .then(({ comments }) => {
                        if (comments.data.length == 0) {
                            this.noComments = true;
                        }
    
                        this.lastPage = comments.meta.last_page;
                        this.comments.push(...comments.data);
                    })
            } else if (this.$route.params.show) {
                await this.$axios.$get(`/api/comments/${this.$route.params.show}?page=${page}`)
                    .then(({ comments }) => {
                        if (comments.data.length == 0) {
                            this.noComments = true;
                        }
    
                        this.lastPage = comments.meta.last_page;
                        this.comments.push(...comments.data);
                    })
            }
        },

        async submitComment() {
            this.commentForm.postId = this.postId;
            await this.$axios.$post('/api/comment/post', this.commentForm)
                .then(() => {
                    this.commentForm.comment = '';
                    this.$refs.commentObserver.reset();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    this.comments = [];
                    this.getComments(this.page);
                })
        },

        deleteComment(postId) {
            let answer = confirm('Delete this comment?');

            if (answer) {
                this.$axios.$delete(`/api/comment/delete/${postId}`)
                    .then(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        this.comments = [];
                        this.getComments(this.page);
                    })
            } 
        },

        handleScrolledToBottom(isVisible) {
            if (!isVisible) { return }
            if (this.page >= this.lastPage) { return }
            this.page++;
            this.getComments(this.page);                
        },
    }
}
</script>

<style>
.quill-editor[data-v-560ba45dz] .ql-editor {
    height: 15vh;
}

.quill-editor[data-v-560ba45dz] .ql-toolbar {
    display: none;
}
</style>