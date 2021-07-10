<template lang="pug">
    include ../../views/helpers/mixins
    include ../../views/helpers/functions
    .cart-item(:class="classModificators")
        .cart-item__inner
            a(:href="link").cart-item__img-link
                img(:src="img" :alt="title" :title="title").cart-item__img
            .cart-item__data
                a(:href="link" :title="title").cart-item__title {{ title }}
                .cart-item__desc {{ desc }}
            template(v-if="inCartMini")
                .cart-item__short-data
                    quantity-counter(
                        @change-quantity='onChangeQuantity'
                        :quantity="quantity"
                    ).quantity--mini
                    .cart-item__price
                        span.cart-item__price-old(v-if="priceOld") {{ priceOld | thousand }}
                        span.cart-item__price-value {{ price | ruble }}
                        span.cart-item__price-type / шт.
            template(v-else)
                .cart-item__price.cart-item__price--desktop(v-if="!inOrder")
                    span.cart-item__price-old(v-if="priceOld") {{ priceOld | thousand }}
                    span.cart-item__price-value {{ price | ruble }}
                    span.cart-item__price-type / шт.
                .cart-item__order(v-if="!inOrder")
                    .cart-item__quantity
                        quantity-counter(
                            @change-quantity='onChangeQuantity'
                            :quantity="quantity"
                        )
            .cart-item__result(v-if="inOrder")
                .cart-item__result-quantity {{ quantity }} шт.
                .cart-item__result-price
                    .cart-item__result-old(v-if="totalOld > 0") {{ totalOld | thousand }}
                    .cart-item__result-total {{ total | ruble }}
            .cart-item__total(v-else)
                span {{ total | ruble }}
                .cart-item__total-price
                    span.cart-item__price-old(v-if="priceOld") {{ priceOld | thousand }}
                    span.cart-item__price-value {{ price | ruble }}
                    span.cart-item__price-type / шт.
            .cart-item__delete(v-if="!inOrder")
                +icon('delete')(@click.prevent="removeFromCart" )
</template>

<script>
import { mapActions } from 'vuex'
import QuantityCounter from '%vue%/components/QuantityCounter'

export default {
    name: 'cart-item',
    components: { QuantityCounter },
    props: {
        id: {
            type: [String, Number],
            required: true
        },
        link: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        img: {
            type: [String, null],
            default: ''
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        priceOld: {
            type: Number
        },
        inOrder: {
            type: Boolean,
            default: false
        },
        inCartMini: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        total() {
            return this.price * this.quantity
        },
        totalOld() {
            return this.priceOld * this.quantity
        },
        classModificators() {
            return {
                'cart-item--in-order': this.inOrder,
                'cart-item--in-cart-mini': this.inCartMini
            }
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
