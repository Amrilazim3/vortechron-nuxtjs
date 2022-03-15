<template>
    <div class="z-30 fixed bottom-14 right-1.5">
        <FlashMessage v-for="notification in notifications" :key="notification.id" :notification="notification"/>
    </div>
</template>

<script>
export default {
    props: {
        notifications: {
            type: Array
        }
    }
}
</script>