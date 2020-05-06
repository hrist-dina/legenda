<template lang="pug">
div.quantity
    button(type="button" @click.prevent="minus") -
    input(type="text" v-model="quantityData")
    button(type="button" @click.prevent="plus") +
</template>

<script>
export default {
    data() {
        return {
            quantity: 1,
        }
    },
    methods: {
        minus() {
            this.quantity--
        },
        plus() {
            this.quantity++
        },
    },
    watch: {
        quantity: function (value) {
            console.log(value)
            this.$emit('change-quantity', value)
        },
    },
    computed: {
        quantityData: {
            get: function () {
                return Math.max(this.quantity, 1)
            },
            set: function (value) {
                return Math.max(value.quantity, 1)
            },
        },
    },
}
</script>

<style scoped>
.quantity {
    display: flex;
    align-items: center;
    background: #e9e9e9;
    border-radius: 4px;
    padding: 4px 5px;
}

input {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    width: 30px;
    height: 30px;
}
button {
    font-size: 18px;
    line-height: 21px;
    color: #aeaeae;
}
</style>
