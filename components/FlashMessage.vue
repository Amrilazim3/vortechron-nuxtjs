<template>
    <div :class="notificationType" class="flex justify-between mt-2.5 px-4 py-2.5 rounded-md w-48">
        <p class="text-medium">{{ notification.message }}</p>
        <button class="font-bold" @click.prevent="removeNotification(notification.id)">X</button>
    </div>
</template>

<script>
export default {
    props: {
        notification: {
            type: Object
        }
    },

    computed: {
        notificationType() {
            return `bg-${this.notification.type}-400`
        }
    },

    methods: {
        removeNotification(notificationId) {
            return this.$store.dispatch('message/closeNotification', notificationId, {root:true});
        }
    }
}
</script>