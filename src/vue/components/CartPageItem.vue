<template lang="pug">
    .cart-page-item
        .cart-page-item__inner
            .cart-page-item__marks
            .cart-page-item__img
            .cart-page-item__data
                .cart-page-item__title {{ title }}
                .cart-page-item__description {{ description }}
            .cart-page-item__order
                .cart-page-item__quantity
                    quantity-counter(@change-quantity='onChangeQuantity' :quantity="quantity" )
                .cart-page-item__price
                    span {{ price }} руб / шт.
            .cart-page-item__total {{ total }} руб.
            .cart-page-item__delete
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
