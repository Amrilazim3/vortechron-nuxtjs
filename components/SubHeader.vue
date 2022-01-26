<template>
    <nav style="background:rgba(211, 211, 211, 1);" v-if="this.$route.path !== '/auth/sign-in' && this.$route.path !== '/auth/sign-up'">
        <div class="grid p-6 py-4 sm:justify-center sm:grid-cols-3 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:grid-cols-4 lg:max-w-4xl xl:grid-cols-3 xl:max-w-5xl 2xl:max-w-7xl">
            <div class="inline-flex sm:col-span-2 sm:self-center lg:col-span-2 xl:col-span-1">
                <ul class="sm:flex sm:space-x-8">
                    <CategoryDropDown/>
                    
                    <NuxtLink to="/">
                        <li class="text-lg font-bold hover:underline">Latest</li>
                    </NuxtLink>

                    <NuxtLink to="/">
                        <li class="text-lg font-bold hover:underline md:ml-4">Popular</li>
                    </NuxtLink>
                </ul>
            </div>
            <div class="pt-2 sm:col-span-1 sm:mt-0 lg:col-span-2 xl:col-span-1 xl:ml-12 2xl:-ml-0">
                <form action="/">
                    <InputWithIcon>
                        <img slot="icon" src="~/assets/search-icon.svg" alt="search-icon" class="absolute ml-3 mt-1 opacity-30 pointer-events-none">
                        <input type="text" placeholder="Search anything..." style="background: rgba(196, 196, 196, 1);" class="pl-10 py-0.5 text-black placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-400 w-2/5 sm:w-max focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    </InputWithIcon>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>