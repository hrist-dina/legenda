<template lang="pug">
div.quantity
    button(type="button" @click.prevent="minus") -
    input(type="text" :value="quantity" @input="onInput")
    button(type="button" @click.prevent="plus") +
</template>

<script>
export default {
    props: {
        quantity: {
            type: Number,
            default: 1
        }
    },
    methods: {
        minus() {
            this.updateQuantity(Math.max(this.quantity - 1, 1))
        },
        plus() {
            this.updateQuantity(Math.max(this.quantity + 1, 1))
        },
        onInput({ target }) {
            const value = target.value.trim().replace(/[^0-9]+/g, '')
            this.updateQuantity(Math.max(+value, 1))
            this.$forceUpdate()
        },
        updateQuantity(value) {
            this.$emit('change-quantity', value)
        }
    }
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
