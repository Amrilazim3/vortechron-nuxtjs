<template>
    <section class="grid p-6 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-3xl">
        <ValidationObserver class="px-6 py-10 mt-8 bg-white rounded-md" ref="formObserver" tag="div" v-slot="{ handleSubmit }">
            <form ref="form" @submit.prevent="handleSubmit(edit)">
                <h1 class="text-2xl font-semibold text-center">Edit Post</h1>
                <div class="w-full mt-6">
                    <h2 class="mb-2">Title</h2>
                    <ValidationProvider tag="div" vid="title" name="Title" rules="required|max:50" v-slot="{ errors }">
                        <input type="text" id="title" name="title" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.title"/>
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
                <div class="w-full mt-6">
                    <h2 class="mb-2">Thumbnail Image</h2>
                    <div class="flex">
                        <template v-if="form.thumbnail && selectedImage == ''">
                            <div>
                                <img :src="form.thumbnail" class="w-32 h-20 rounded-md" alt="thumbnail picture" />
                                <button class="text-red-500" @click.prevent="clearFileForm">clear</button>
                            </div>
                        </template>
                        <template v-else-if="selectedImage == ''">
                            <div class="flex w-32 h-20 bg-gray-200 border border-black rounded-md">
                                <h1 class="self-center mx-auto text-3xl text-gray-600 cursor-default">?</h1>
                            </div>
                        </template>
                        <template v-else>
                            <div>
                                <img id="output-selected-file" :src="selectedImage" class="w-32 h-20 rounded-md" alt="thumbnail picture" />
                                <button class="text-red-500" @click.prevent="clearFileForm">clear</button>
                            </div>
                        </template>
                        <label for="file" class="self-center inline-block px-2 py-1 ml-10 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500">
                            <input type="file" id="file" name="file" accept="image/*" @change="handleFileUpload($event)" class="hidden"/>
                            Select Thumbnail
                        </label>
                    </div>
                </div>
                <div class="w-full mt-6">
                    <h2 class="mb-2">Excerpt</h2>
                    <ValidationProvider tag="div" vid="excerpt" name="Excerpt" rules="required|max:100" v-slot="{ errors }">
                        <input type="text" id="excerpt" name="excerpt" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.excerpt"/>
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
                <div class="w-full mt-6">
                    <h2 class="mb-2">Body</h2>
                    <ValidationProvider tag="div" vid="body" name="Body" rules="required|min:100" v-slot="{ errors }">
                        <quill-editor 
                            v-model="form.body"
                            ref="myQuillEditor"
                            :options="editorOption" 
                        />                        
                        <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
                <div class="w-full mt-6">
                    <h2 class="mb-2">Categories</h2>
                    <select name="category" id="category" class="border border-black rounded-md" v-model="form.category">
                        <option value="" selected hidden>Select</option>
                        <option value="none">None</option>
                        <option v-for="category in categories" :key="category.name">{{ category.name }}</option>
                    </select>
                </div>
                <div class="flex justify-between">
                    <div></div>
                    <button type="submit" id="submit" class="mt-8 bg-blue-400 py-1.5 px-6 border-black rounded-md hover:bg-blue-500">
                        Save
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </section>
</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor';

export default {
    layout: 'hide-subnav',
    
    middleware: 'auth',

    head: {
        title: '| Edit Post',
        meta: [
            { hid: 'description', name: 'description', content: 'edit post' }
        ],
    },

    components: {
        quillEditor
    },

    mounted() {
        if (!this.$auth.user.email_verified_at && !this.$auth.user.service) {
            this.$router.push('/user/account/profile');
        }
        this.getPost();
        this.getCategories();
    },

    data() {
        return {
            form: {
                title: '',
                thumbnail: '',
                excerpt: '',
                body: '',
                category: ''
            },
            selectedImage: '',
            categories: [],

            editorOption: {
                debug: null,
                placeholder: 'Type your post here...',
                readOnly: true,
                theme: 'snow'
            },
            delta: undefined
        }
    },

    methods: {
        async getPost() {
            await this.$axios.$get(`/api/user/posts/edit-post-data/${this.$route.params.slug}`)
                .then(({ post }) => {
                    this.form.title = post.title;
                    this.form.thumbnail = post.thumbnail;
                    this.form.excerpt = post.excerpt;
                    this.form.body = post.body;
                    this.form.category = post.category[0];
                })
        },

        async edit() {
            let formData = new FormData(this.$refs.form);
            formData.append('body', this.form.body);
            if (this.form.thumbnail && this.selectedImage) {
                formData.append('thumbnail', this.form.thumbnail);
            }
            await this.$axios.$post(`/api/user/posts/${this.$route.params.slug}/edit`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    this.$store.dispatch('message/addNotification', {
                        type: 'green',
                        message: 'Post updated'
                    }, {root:true});
                    this.$router.push('/user/account/profile');
                })
                .catch((err) => {
                    if (err.response.status == 422) {
                        let errors = [];
                        errors = err.response.data.errors;
                        this.$refs.formObserver.setErrors(errors)
                    }
                })
        },

        handleFileUpload(event) {
            this.form.thumbnail = event.target.files[0];
            this.selectedImage = URL.createObjectURL(this.form.thumbnail);
        },

        clearFileForm() {
            this.form.thumbnail = '';
            this.selectedImage = '';
        },

        getCategories() {
            this.$axios.$get('/api/user/posts/create/categories-list')
                .then(({ categories }) => {
                    this.categories.push(...categories);
                })
        }
    }
}
</script>

<style>
.ql-editor {
    height: 42vh;
}
</style>