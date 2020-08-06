<template lang="pug">
include ../../views/helpers/mixins
div.quantity(:class="modificators")
    button(type='button' @click.prevent="minus" :disabled="isDisabled").button.quantity__button.quantity__button--minus
        +icon('minus')
    span.quantity__value
        input(type="text" :value="quantity" @input="onInput" :style="{width: inputWidth}").quantity__input
        span.quantity__type(v-if="type && !isDetail") {{ type }}
    button(type='button' @click.prevent="plus" :disabled="isLimit").button.quantity__button.quantity__button--plus
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
            type: [String, Boolean],
            default: 'шт.'
        },
        isDetail: {
            type: Boolean,
            default: false
        },
        limit: {
            type: [Number, undefined],
            default: undefined
        }
    },
    computed: {
        isDisabled() {
            return this.quantity === 1
        },
        isLimit() {
            return this.quantity === this.limit
        },
        inputWidth() {
            return `${this.quantity.toString().length}ch`
        },
        modificators() {
            return {
                'quantity--detail': this.isDetail,
                'quantity--type-empty': !this.type
            }
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

<!-- style in bem components quantity -->
