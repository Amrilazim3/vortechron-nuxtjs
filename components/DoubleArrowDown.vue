<template>
    <button class="-mt-1 sm:hidden" @click="isOpen = !isOpen" v-on:click="changeState()">
        <img src="~/assets/double-right-arrow-icon.svg" alt="" class="h-6 ml-1.5" :class="{ 'transform origin-center -rotate-90 transition delay-150 hover:transition-all' : isOpen, 'transform origin-center rotate-90 transition delay-150 transition-all' : !isOpen }">
    </button>
</template>

<script>
export default {
    data: () => ({
        isOpen: false,
    }),

    mounted: () => ({
        isOpen: false
    }),

    methods: {
        changeState() {
            this.$emit('changeState')
        }
    }
        
}
</script>