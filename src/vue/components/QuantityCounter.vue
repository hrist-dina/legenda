<template lang="pug">
include ../../views/helpers/mixins
div.quantity(:class="modificators")
    button(
        type='button'
        @click.prevent="minus"
        :disabled="isDisabled"
    ).button.quantity__button.quantity__button--minus
        +icon('minus')
    span.quantity__value
        input(
            type="text"
            :value="getQuantity"
            @input="onInput"
            :style="{width: inputWidth}"
        ).quantity__input
        span.quantity__type(v-if="type && !isDetail") {{ type }}
    button(
        type='button'
        @click.prevent="plus"
        :disabled="isLimit"
    ).button.quantity__button.quantity__button--plus
        +icon('plus')
</template>

<script>
export default {
    props: {
        quantity: {
            type: [Number, undefined],
            default: undefined
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
        },
        canBeZero: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled() {
            return this.getQuantity === this.getInitValue
        },
        isLimit() {
            return this.getQuantity === this.limit
        },
        inputWidth() {
            return `${this.getQuantity.toString().length}ch`
        },
        modificators() {
            return {
                'quantity--detail': this.isDetail,
                'quantity--type-empty': !this.type
            }
        },
        getQuantity() {
            return this.canBeZero ? this.quantity || 0 : this.quantity || 1
        },
        getInitValue() {
            return this.canBeZero ? 0 : 1
        }
    },
    methods: {
        minus() {
            this.updateQuantity(
                Math.max(this.getQuantity - 1, this.getInitValue)
            )
        },
        plus() {
            this.updateQuantity(Math.max(this.getQuantity + 1, 1))
        },
        onInput({ target }) {
            const value = target.value.trim().replace(/[^0-9]+/g, '')
            this.updateQuantity(Math.max(+value, this.getInitValue))
            this.$forceUpdate()
        },
        updateQuantity(value) {
            this.$emit('change-quantity', value)
        }
    }
}
</script>

<!-- style in bem components quantity -->
