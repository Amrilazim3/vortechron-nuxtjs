<template>
    <section v-if="!noPost" class="w-10/12 mx-auto mt-4 sm:grid sm:grid-cols-6 sm:w-full">
        <div class="relative px-2 py-1 mb-6 transition duration-300 ease-in-out bg-white border rounded-md shadow-2xl sm:mr-3 hover:bg-gray-100 sm:col-span-3 lg:col-span-2" 
            v-for="post in posts"
            :key="post.user_id"
        >
            <template v-if="post.user_id == currentUserId">
                <template v-if="!post.thumbnail">
                    <div class="flex w-full h-32 mb-4 bg-gray-300">
                        <p class="self-center mx-auto font-thin cursor-default">BLANK</p>
                    </div>
                </template>
                <template v-else>
                    <img :src="post.thumbnail" alt="" class="h-32 mb-4 bg-gray-300" style='width: 100%; object-fit: contain'>
                </template>
                <template v-if="post.category[0]">
                    <NuxtLink :to="`/posts/categories/${post.category_slug[0]}`" class="text-sm text-blue-400 hover:underline">{{ post.category[0] }}</NuxtLink>
                </template>
                <template v-else>
                    <p class="text-sm opacity-0 cursor-default">hidden</p>
                </template>
                <NuxtLink :to="`/user/posts/${post.slug}`" class="flex text-lg font-bold mt-2.5 hover:underline">{{ post.title }}</NuxtLink>
                <p class="h-20 mt-4 text-sm">{{ post.excerpt }}</p>
                <div class="bottom-0 flex justify-between pb-2">
                    <div class="flex">
                        <template v-if="!post.image_url">
                            <button class="bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push('/user/account/profile')">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                        <template v-else>
                            <button @click.prevent="$router.push('/user/account/profile')">
                                <img class="rounded-full w-9 h-9" :src="post.image_full_url" id="image-url">
                            </button>
                        </template>
                        <div class="inline-grid ml-2">
                            <NuxtLink to="/user/account/profile" class="text-base font-medium">{{ post.username }}</NuxtLink>
                            <VueMomentsAgo prefix="posted" suffix="ago" :date="post.created_at" lang="en" class="self-center" />
                        </div>
                    </div>
                    <button class="self-center bg-blue-300 px-2 py-1.5 border rounded-md hover:bg-blue-400" @click="$router.push(`/user/posts/${post.slug}`)">Read more</button>
                </div>
            </template>
            <template v-else>
                <template v-if="!post.thumbnail">
                    <div class="flex w-full h-32 mb-4 bg-gray-300">
                        <p class="self-center mx-auto font-thin cursor-default">BLANK</p>
                    </div>
                </template>
                <template v-else>
                    <img :src="post.thumbnail" alt="" class="h-32 mb-4 bg-gray-300" style='width: 100%; object-fit: contain'>
                </template>
                <template v-if="post.category[0]">
                    <NuxtLink :to="`/posts/categories/${post.category_slug[0]}`" class="text-sm text-blue-400 hover:underline">{{ post.category[0] }}</NuxtLink>
                </template>
                <template v-else>
                    <p class="text-sm opacity-0 cursor-default">hidden</p>
                </template>
                <NuxtLink :to="`/users/${post.user_id}/posts/${post.slug}`" class="flex text-lg font-bold mt-2.5 hover:underline">{{ post.title }}</NuxtLink>
                <p class="h-20 mt-4 text-sm">{{ post.excerpt }}</p>
                <div class="bottom-0 flex justify-between pb-2">
                    <div class="flex">
                        <template v-if="!post.image_url">
                            <button class="bg-gray-300 max-w-max p-2.5 rounded-full" @click.prevent="$router.push(`/users/${post.user_id}`)">
                                <img src="~/assets/default-profile-icon.svg" alt="" class="h-5">
                            </button>
                        </template>
                        <template v-else>
                            <button @click.prevent="$router.push(`/users/${post.user_id}`)">
                                <img class="rounded-full w-9 h-9" :src="post.image_full_url" id="image-url">
                            </button>
                        </template>
                        <div class="inline-grid ml-2">
                            <NuxtLink :to="`/users/${post.user_id}`" class="text-base font-medium">{{ post.username }}</NuxtLink>
                            <VueMomentsAgo prefix="posted" suffix="ago" :date="post.created_at" lang="en" class="self-center" />
                        </div>
                    </div>
                    <button class="self-center bg-blue-300 px-2 py-1.5 border rounded-md hover:bg-blue-400" @click="$router.push(`/users/${post.user_id}/posts/${post.slug}`)">Read more</button>
                </div>
            </template>
        </div>
        <slot name="scroll-handler"></slot>
    </section>
    <section v-else class="mx-auto mt-4 sm:w-full">
        <slot name="no-post-message"></slot>
    </section>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

export default {
    components: {
        VueMomentsAgo
    },
    
    props: {
        noPost: {
            type: Boolean,
            default: false
        },

        posts: {
            type: Array,
            default: []
        },

        currentUserId: {
            type: Number,
            default: 0
        }
    }
}
</script>