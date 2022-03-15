<template>
    <div style="background-color: rgba(202, 202, 202, 1);" class="min-h-screen">
        <Nav />
        <FlashMessageLists :notifications="notifications" />
        <Nuxt />
    </div>
</template>

<script>

export default {
    mounted() {
        this.notifications = this.$store.state.message.notifications;
    },

    data() {
        return {
            notifications: []
        }
    }
}
</script>