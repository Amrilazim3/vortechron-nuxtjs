<template>
    <NuxtLink :to="to" class="mt-1 px-1 hover:bg-gray-200 focus:bg-gray-400 rounded-md">
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