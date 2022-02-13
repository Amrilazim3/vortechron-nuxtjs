<template>
    <input 
        :type="type"
        :id="id"
        class="bg-gray-300 w-full pl-4 h-10 mt-1.5 border border-gray-400 focus:border-gray-600 focus:outline-none rounded-md" 
        :value="value"
        @input="updateValue($event.target.value)"
        @change="updateValue($event.target.value)"
        @blur="$emit('blur')"
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

    data(){
        return {
            valueInner: this.value
        }
    },

    $_veeValidate: {
        value () {
            return this.valueInner;
        },
        name () {
            return 'InputField'
        }
    },

    methods: {
        updateValue: function (value) {
            this.valueInner = value
            this.$emit('input', value)
        }
    }
}
</script>