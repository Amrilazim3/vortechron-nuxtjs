<template>
    <section class="grid md:flex p-6 mt-10 sm:max-w-xl sm:justify-center sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div class="bg-white p-4 rounded-md shadow-2xl sm:p-6 sm:w-full lg:w-2/3">
            <div>
                <h3 class="text-2xl font-semibold">Edit Profile</h3>
                <p class="text-sm">Update and secure your personal information</p>
            </div>
            <div class="bg-gray-300 h-0.5 mt-4"></div>
            <form ref="form" @submit.prevent="edit">
                <div class="mt-6 flex">
                    <h2 class="w-1/3 self-center">Profile Image</h2>
                    <div class="w-2/3">
                        <template v-if="!this.$auth.user.image_url">
                            <div class="bg-gray-300 max-w-max p-2.5 rounded-full">
                                <img class="h-8" src="~/assets/default-profile-icon.svg" alt="">
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex">
                                <img class="h-14 w-14 rounded-full" :src="this.form.image_full_url" id="image-url" alt="">
                                <button class="ml-4 text-sm font-light underline hover:text-red-500" @click.prevent="removeFile">Remove</button>
                            </div>
                        </template>
                        <div class="flex">
                            <input type="file" id="file" @change="handleFileUpload($event)" class="mt-4"/>
                            <button class="self-end ml-2 py-0.5 px-2 border border-black bg-gray-200 hover:bg-gray-300" v-if="this.file" @click.prevent="clearFileForm">clear</button>
                        </div>
                        <p v-if="errors.file" class="text-red-500">{{ errors.file[0] }}</p>
                    </div>
                </div>
                <div class="mt-6 flex w-full">
                    <h2 class="w-1/3 self-center">Name</h2>
                    <div class="w-2/3"> 
                        <input type="text" name="name" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.name" required/>
                        <p v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</p>
                    </div> 
                </div>
                <div class="mt-6 flex w-full">
                    <h2 class="w-1/3 self-center">Username</h2>
                    <div class="w-2/3">
                        <input type="text" name="username" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.username" required/>
                        <p v-if="errors.username" class="text-red-500">{{ errors.username[0] }}</p>
                    </div> 
                </div>
                <div class="mt-6 flex w-full">
                    <h2 class="w-1/3 self-center">Bio</h2>
                    <div class="w-2/3">
                        <textarea rows="4" cols="30" name="bio" class="bg-white w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" placeholder="Enter your bio here" v-model="form.bio"/>
                        <p v-if="errors.bio" class="text-red-500">{{ errors.bio[0] }}</p>
                    </div> 
                </div>
                <div class="mt-6 flex w-full">
                    <h2 class="w-1/3 self-center">Email</h2>
                    <div class="w-2/3">
                        <input type="email" name="email" class="bg-white h-8 w-full pl-2.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" v-model="form.email" required/>
                        <p v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</p>
                    </div> 
                </div>
                <div class="flex justify-between">
                    <div></div>
                    <button class="mt-8 bg-blue-500 py-1.5 px-6 border-black rounded-md hover:bg-blue-600">
                        Save
                    </button>
                </div>
            </form>
        </div>
        <div class="modal hidden" id="modal">
            <div class="modal-content">
                Update successful
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
        this.form = JSON.parse(JSON.stringify(this.$auth.user))
    },

    data: () => ({
        form: {},
        file: '',
        errors: []
    }),

    methods: {
        async edit() {
            try {
                let formData = new FormData(this.$refs.form)
                formData.append('file', this.file)
                await this.$axios.$post('/api/user/profile/edit', formData, {
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
                    this.errors = [];
                })
                .catch((err) => {
                    if (err.response.status == 422) {
                        this.errors = err.response.data.errors;
                    }
                })
            } catch (error) {}
        },

        handleFileUpload(event) {
            this.file = event.target.files[0];
        },

        async removeFile() {
            let answer = confirm("Are you sure to delete your profile picture?");

            if (answer) {
                try {
                    await this.$axios.$get('/api/user/profile/remove-file')
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
</style>