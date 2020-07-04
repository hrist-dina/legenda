<template lang="pug">
include ../../views/helpers/mixins
div.quantity
    button(type='button' @click.prevent="minus").button.quantity__button
        +icon('minus')
    span.quantity__value
        input(type="text" :value="quantity" @input="onInput").quantity__input
        span.quantity__type(v-if="type") {{ type }}
    button(type='button' @click.prevent="plus").button.quantity__button
        +icon('plus')
</template>

<script>
export default {
    props: {
        quantity: {
            type: Number,
            default: 1
        },
        type: {
            type: [String, undefined],
            default: 'шт.'
        },
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

<!-- style in bem components quantity -->