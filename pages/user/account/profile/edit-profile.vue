<template>
    <section class="grid p-6 mt-10 sm:max-w-xl sm:mx-auto md:flex md:justify-around md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <ProfileSideBarNav />
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full lg:w-2/3">
            <div>
                <h3 class="text-2xl font-semibold">Edit Profile</h3>
                <p class="text-sm">Update and secure your personal information</p>
            </div>
            <div class="bg-gray-300 h-0.5 mt-4"></div>
                <div class="mt-6 flex">
                    <h2 class="w-1/3 self-center">Profile Image</h2>
                    <div class="w-2/3">
                        <template v-if="!this.form.image_url">
                            <template v-if="!this.file">
                                <div class="bg-gray-300 max-w-max p-2.5 rounded-full">
                                    <img class="h-8" src="~/assets/default-profile-icon.svg" alt="">
                                </div>
                            </template>
                            <template v-else>
                                <div>
                                    <img id="output-selected-file" :src="this.selectedImage" class="h-14 w-14 rounded-full" />
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <template v-if="!this.file">
                                <div class="flex">
                                    <img class="h-14 w-14 rounded-full" :src="this.form.image_full_url" id="image-url">
                                    <button class="ml-4 hover:underline hover:text-red-500" @click.prevent="removeFile">Remove</button>
                                </div>
                            </template>
                            <template v-else>
                                <div>
                                    <img id="output-selected-file" :src="this.selectedImage" class="h-14 w-14 rounded-full" />
                                </div>
                            </template>
                        </template>
                        <div>
                            <label for="file" class="bg-blue-400 cursor-pointer hover:bg-blue-500 inline-block mt-4 px-2 py-1 rounded-md">
                                <input type="file" id="file" accept="image/*" @change="handleFileUpload($event)" class="hidden"/>
                                Select Photo
                            </label>
                            <button class="text-red-400" v-if="this.file" @click.prevent="clearFileForm">clear</button>
                        </div>
                    </div>
                </div>
                <ValidationObserver ref="formObserver" tag="div" v-slot="{ handleSubmit }">
                    <form ref="form" @submit.prevent="handleSubmit(edit)">
                        <div class="mt-6 flex w-full">
                            <h2 class="w-1/3 self-center">Name</h2>
                            <ValidationProvider tag="div" vid="name" name="Name" rules="required|max:50" v-slot="{ errors }" class="w-2/3">
                                <input type="text" name="name" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.name"/>
                                <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                            </ValidationProvider>
                        </div>
                        <div class="mt-6 flex w-full">
                            <h2 class="w-1/3 self-center">Username</h2>
                            <ValidationProvider tag="div" vid="username" name="Username" rules="required|min:4|max:15" v-slot="{ errors }" class="w-2/3">
                                <input type="text" name="username" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.username" />
                                <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                            </ValidationProvider>
                        </div>
                        <div class="mt-6 flex w-full">
                            <h2 class="w-1/3 self-center">Bio</h2>
                            <ValidationProvider tag="div" vid="bio" name="Bio" rules="max:100" v-slot="{ errors }" class="w-2/3">
                                <textarea rows="4" cols="30" name="bio" class="bg-white w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" placeholder="Enter your bio here" v-model="form.bio"/>
                                <p name="error-message" class="text-red-500">{{ errors[0] }}</p>
                            </ValidationProvider>
                        </div>
                        <div class="mt-6 flex w-full cursor-default">
                            <h2 class="w-1/3 self-center">Email</h2>
                            <p>{{ form.email }}</p>
                            <template v-if="!form.service">
                                <NuxtLink to="/user/account/profile/change-email" class="text-sm text-blue-400 ml-2.5 self-end hover:underline cursor-pointer">change</NuxtLink>
                            </template>
                            <template v-else>
                                <div class="tooltip-wrap self-end">
                                    <p class="text-sm text-red-400 ml-2.5">Email can't change</p>
                                    <div class="tooltip-content rounded-md mt-5 ml-2.5 lg:w-max">
                                        <p class="text-xs">You are sign in using {{ form.service }} service</p>
                                    </div> 
                                </div>
                            </template>
                        </div>
                        <div class="flex justify-between">
                            <div></div>
                            <button class="mt-8 bg-blue-500 py-1.5 px-6 border-black rounded-md hover:bg-blue-600">
                                Save
                            </button>
                        </div>
                </form>
            </ValidationObserver>
        </div>
        <div class="modal hidden" id="modal">
            <div class="modal-content">
                Edit successful
            </div>
        </div>
    </section>
</template>

<script>
export default {
    
    middleware: 'auth',

    head: {
        title: '| Edit Profile',
        meta: [
            { hid: 'description', name: 'description', content: 'Bookmarked' }
        ],
    },

    mounted() {
        this.form = JSON.parse(JSON.stringify(this.$auth.user));
    },

    data() {
        return {
            form: {},
            file: '',
            selectedImage: ''
        }
    },

    methods: {
        async edit() {
            try {
                let errors = [];
                let formData = new FormData(this.$refs.form)
                formData.append('file', this.file)
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
                    await this.$axios.$get('/api/user/account/profile/remove-profile-image')
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
</style>