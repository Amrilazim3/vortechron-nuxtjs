<template>
    <section class="grid p-6 pt-56 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:max-w-4xl xl:pt-36 xl:max-w-5xl 2xl:max-w-7xl" :class="this.$auth.loggedIn && !this.$auth.user.email_verified_at && !this.$auth.user.service ? 'pt-72 xl:pt-56' : '' ">
        <h1 class="text-4xl font-normal text-center my-8">Explore Blogs</h1>
        <div class="w-10/12 mx-auto sm:grid sm:grid-cols-6 sm:w-full">
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
            <div class="relative px-2 py-1 mb-6 sm:mr-3 bg-white border rounded-md shadow-2xl hover:bg-gray-200 transition duration-300 ease-in-out sm:col-span-3 lg:col-span-2">
                <img src="https://picsum.photos/id/235/300/100" alt="" class="border rounded-md w-full">
                <h5 class="my-4 text-xs text-blue-400">holiday</h5>
                <h2 class="text-lg font-bold">Going  hiking by this weekend</h2>
                <p class="my-4 pb-12 text-sm">ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                <div class="absolute bottom-0 w-full flex justify-between">
                    <div class="flex">
                        <div class="self-center">
                            <button class="bg-gray-300 border rounded-full p-1.5 mr-2">
                                <NuxtLink to="#">
                                    <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                                </NuxtLink>
                            </button>
                        </div>
                        <div class="my-2.5">
                            <NuxtLink to="#" class="text-base font-medium">username</NuxtLink>
                            <h5 class="text-xs font-normal text-gray-500">March 1, 2020</h5>
                        </div>
                    </div>
                    <div class="self-center mr-4">
                        <button class="bg-blue-300 p-1.5 border rounded-2xl hover:bg-blue-400">Read more</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    head: {
        title: '| Dashboard',
        meta: [
            { hid: 'description', name: 'description', content: 'Dashboard' }
        ],
    },
}
</script>