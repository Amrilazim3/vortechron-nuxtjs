<template>
    <input 
        :type="type"
        :id="id"
        class="bg-gray-300 w-full pl-4 h-10 mt-1.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" 
        :value="value"
        @input="updateValue($event.target.value)"
    >
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: ''
        },

        id: {
            type: String,
            default: ''
        },

        value: {
            type: String,
            default: ''
        }
    },

    methods: {
        updateValue: function (value) {
            this.$emit('input', value)
        }
    }
}
</script>