<template lang="pug">
    include ../../views/helpers/mixins
    include ../../views/helpers/functions
    .cart-item
        .cart-item__inner
            a(:href="link").cart-item__img-link
                img(:src="img" :alt="title" :title="title").cart-item__img
            .cart-item__data
                a(:href="link" :title="title").cart-item__title {{ title }}
                .cart-item__desc {{ desc }}
            .cart-item__price
                span.cart-item__price-value(v-ruble) {{ price }}
                span.cart-item__price-type / шт.
            .cart-item__order(v-if="hasOrder")
                .cart-item__quantity
                    quantity-counter(
                        @change-quantity='onChangeQuantity'
                        :quantity="quantity"
                    )
            .cart-item__total(v-ruble) {{ total }}
            .cart-item__delete
                +icon('delete')(@click.prevent="removeFromCart" )
</template>

<script>
import { mapActions } from 'vuex'
import QuantityCounter from '%vue%/components/QuantityCounter'

export default {
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
