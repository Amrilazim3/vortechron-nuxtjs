<template>
    <div>
        <div class="hidden bg-green-400" id="password_set_message">
            <p class="text-sm font-thin text-center">Password has been set.</p>
        </div>
        <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:flex md:justify-around md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
            <ProfileSideBarNav />
            <div class="p-4 bg-white rounded-md shadow-2xl sm:p-6 sm:w-full lg:w-2/3">
                <div>
                    <h3 class="text-2xl font-semibold">Edit Profile</h3>
                    <p class="text-sm">Update and secure your personal information</p>
                </div>
                <div class="bg-gray-300 h-0.5 mt-4"></div>
                    <div class="flex mt-6">
                        <h2 class="self-center w-1/3">Profile Image</h2>
                        <div class="w-2/3">
                            <template v-if="!this.form.image_url">
                                <template v-if="!this.file">
                                    <div class="bg-gray-300 max-w-max p-2.5 rounded-full">
                                        <img class="h-8" src="~/assets/default-profile-icon.svg" alt="">
                                    </div>
                                </template>
                                <template v-else>
                                    <div>
                                        <img id="output-selected-file" :src="this.selectedImage" class="rounded-full h-14 w-14" />
                                    </div>
                                </template>
                            </template>
                            <template v-else>
                                <template v-if="!this.file">
                                    <div class="flex">
                                        <img class="rounded-full h-14 w-14" :src="this.form.image_full_url" id="image-url">
                                        <button class="ml-4 hover:underline hover:text-red-500" @click.prevent="removeFile">Remove</button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div>
                                        <img id="output-selected-file" :src="this.selectedImage" class="rounded-full h-14 w-14" />
                                    </div>
                                </template>
                            </template>
                            <div>
                                <label for="file" class="inline-block px-2 py-1 mt-4 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500">
                                    <input type="file" id="file" name="file" accept="image/*" @change="handleFileUpload($event)" class="hidden"/>
                                    Select Photo
                                </label>
                                <button class="text-red-400" v-if="this.file" @click.prevent="clearFileForm">clear</button>
                            </div>
                        </div>
                    </div>
                    <ValidationObserver ref="formObserver" tag="div" v-slot="{ handleSubmit }">
                        <form ref="form" @submit.prevent="handleSubmit(edit)">
                            <div class="flex w-full mt-6">
                                <h2 class="self-center w-1/3">Name</h2>
                                <ValidationProvider tag="div" vid="name" name="Name" rules="required|max:50" v-slot="{ errors }" class="w-2/3">
                                    <input type="text" id="name" name="name" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.name"/>
                                    <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                                </ValidationProvider>
                            </div>
                            <div class="flex w-full mt-6">
                                <h2 class="self-center w-1/3">Username</h2>
                                <ValidationProvider tag="div" vid="username" name="Username" rules="required|min:4|max:15" v-slot="{ errors }" class="w-2/3">
                                    <input type="text" id="username" name="username" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.username" />
                                    <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                                </ValidationProvider>
                            </div>
                            <div class="flex w-full mt-6">
                                <h2 class="self-center w-1/3">Bio</h2>
                                <ValidationProvider tag="div" vid="bio" name="Bio" rules="max:100" v-slot="{ errors }" class="w-2/3">
                                    <quill-editor
                                        class="border border-gray-300 rounded-md"
                                        v-model="form.bio"
                                        ref="myQuillEditor"
                                        :options="editorOption"
                                        data-v-58aa27c9
                                    />
                                    <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                                </ValidationProvider>
                            </div>
                            <div class="flex w-full mt-6 cursor-default">
                                <h2 class="self-center w-1/3">
                                    Email
                                    <template v-if="form.email_verified_at || form.service">
                                        <span class="text-sm font-light text-blue-400">(verified)</span>
                                    </template> 
                                    <template v-else-if="!form.email_verified_at && !form.service">
                                        <span class="text-sm font-light text-red-400">(unverified)</span>
                                    </template>
                                </h2>
                                <p>{{ form.email }}</p>
                                <template v-if="!form.service">
                                    <NuxtLink to="/user/account/profile/change-email" class="text-sm text-blue-400 ml-2.5 self-end hover:underline cursor-pointer">change</NuxtLink>
                                </template>
                                <template v-else>
                                    <div class="self-end tooltip-wrap">
                                        <p class="text-sm text-red-400 ml-2.5">Email can't change</p>
                                        <div class="tooltip-content rounded-md mt-5 ml-2.5 lg:w-max">
                                            <p class="text-xs">You are sign in using {{ form.service }} service</p>
                                        </div> 
                                    </div>
                                </template>
                            </div>
                            <div class="flex justify-between">
                                <div></div>
                                <button type="submit" id="submit" class="mt-8 bg-blue-400 py-1.5 px-6 border-black rounded-md hover:bg-blue-500">
                                    Save
                                </button>
                            </div>
                    </form>
                </ValidationObserver>
            </div>
            <div class="hidden modal" id="modal">
                <div class="modal-content">
                    <p class="text-center">Edit successful</p>
                    <button class="w-full bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-md py-1.5 mt-4">close</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor';

export default {
    layout: 'hide-subnav',
    
    middleware: 'auth',

    head: {
        title: '| Edit Profile',
        meta: [
            { hid: 'description', name: 'description', content: 'Edit Profile' }
        ],
    },

    components: {
        quillEditor
    },

    mounted() {
        this.form = JSON.parse(JSON.stringify(this.$auth.user));
        
        if (this.$route.query.message == 'password_set') {
            let passwordSetMessage = document.getElementById('password_set_message');
            passwordSetMessage.classList.remove('hidden');
            setTimeout(function () {
                passwordSetMessage.classList.add('hidden');
            }, 3500);
        }
    },

    data() {
        return {
            form: {},
            file: '',
            selectedImage: '',

            editorOption: {
                debug: null,
                placeholder: 'Type your bio here...',
                readOnly: true,
                theme: 'snow'
            },
        }
    },

    methods: {
        async edit() {
            try {
                let errors = [];
                let formData = new FormData(this.$refs.form)
                formData.append('file', this.file)
                formData.append('bio', this.form.bio)
                await this.$axios.$post('/api/user/account/profile/edit', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((resp) => {
                    document.getElementById('modal').classList.remove('hidden')
                    document.body.classList.add('overflow-hidden');
                    document.addEventListener('click', this.removeModal)
                    this.form = resp.user
                    this.$auth.setUser(JSON.parse(JSON.stringify(resp.user)))
                    this.clearFileForm()
                })
                .catch((err) => {
                    if (err.response.status == 422) {
                        errors = err.response.data.errors;
                        this.$refs.formObserver.setErrors(errors)
                    }
                })
            } catch (error) {}
        },

        handleFileUpload(event) {
            this.file = event.target.files[0];
            this.selectedImage = URL.createObjectURL(this.file);
        },

        async removeFile() {
            let answer = confirm("Are you sure to delete your profile picture?");

            if (answer) {
                try {
                    await this.$axios.$patch('/api/user/account/profile/remove-profile-image')
                    .then((resp) => {
                        this.form = resp.user
                        this.$auth.setUser(JSON.parse(JSON.stringify(resp.user)))
                    })
                } catch (e) {}
            } 
        },

        clearFileForm() {
            document.getElementById('file').value = '';
            this.file = '';
        },
        
        removeModal() {
            document.getElementById('modal').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
}
</script>

<style>
.modal {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.75);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s;
}
.modal-content {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2% 7%;
    border-radius: 0.5rem;
}

.tooltip-wrap {
  position: relative;
}
.tooltip-wrap .tooltip-content {
  display: none;
  position: absolute;
  top: 5%;
  background-color: rgb(229 231 235);
  padding: .5em;
}
.tooltip-wrap:hover .tooltip-content {
  display: block;
}

.quill-editor[data-v-58aa27c9] .ql-editor {
    height: 20vh;
}

.quill-editor[data-v-58aa27c9] .ql-toolbar {
    display: none;
}
</style>