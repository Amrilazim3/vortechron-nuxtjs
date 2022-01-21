<template>
    <button :type="type" class="py-2 px-3.5 bg-blue-500 text-white rounded-md hover:bg-blue-800">
        <slot/>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button' 
        }
    }
}
</script>