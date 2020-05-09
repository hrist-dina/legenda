<template lang="pug">
    .cart-item
        .cart-item__inner
            .cart-item__marks
            .cart-item__img
            .cart-item__data
                .cart-item__title {{ title }}
                .cart-item__description {{ description }}
            .cart-item__order(v-if="hasOrder")
                .cart-item__quantity
                    quantity-counter(@change-quantity='onChangeQuantity' :quantity="quantity" )
                .cart-item__price
                    span {{ price }} руб / шт.
            .cart-item__total {{ total }} руб.
            .cart-item__delete
                button(type='button' @click.prevent="removeFromCart") x
</template>

<script>
import { mapActions } from 'vuex'
import QuantityCounter from '%vue%/components/QuantityCounter'

export default {
    components: { QuantityCounter },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        hasOrder: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        total() {
            return this.price * this.quantity
        }
    },
    methods: {
        ...mapActions('cart', {
            add: 'add',
            remove: 'remove'
        }),
        onChangeQuantity(cnt) {
            this.add({ id: this.id, cnt: cnt })
        },
        removeFromCart() {
            this.remove({ id: this.id })
        }
    }
}
</script>

<!-- style in bem components cart-page -->
