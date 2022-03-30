<template>
    <div class="min-h-screen px-4 pt-56 sm:pt-44 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div class="mx-auto max-w-max">
            <main class="sm:flex">
                <p class="text-4xl font-extrabold text-gray-500 sm:text-5xl">404</p>
                <div class="sm:ml-6">
                    <div class="sm:border-l sm:border-gray-200 sm:pl-6">
                    <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                    <p class="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
                    </div>
                        <div class="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <button @click.prevent="$router.back()" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Go back.</button>        
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
}
</script>