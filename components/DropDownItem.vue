<template>
    <NuxtLink :to="to" class="py-0.5 px-1 hover:bg-gray-200 focus:bg-gray-400 rounded-md w-full">
        <slot/>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: false
        }
    },
}
</script>