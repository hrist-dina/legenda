<template lang="pug">
    include ../../views/helpers/mixins
    .cart-item.cart-item--lk
        .cart-item__inner
            a(:href="link").cart-item__img-link
                img(:src="img" :alt="title" :title="title").cart-item__img
            .cart-item__data
                a(:href="link" :title="title").cart-item__title {{ title }}
                .cart-item__desc {{ desc }}
            .cart-item__order
                .cart-item__quantity
                    quantity-counter(
                        @change-quantity='onChangeQuantity'
                        :quantity="quantity"
                    )
            .cart-item__delete
                +icon('delete')(@click.prevent="removeFromLK" )
</template>

<script>
import QuantityCounter from '%vue%/components/QuantityCounter'
import { mapActions } from 'vuex'

export default {
    name: 'cart-item-lk',
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
        }
    },
    methods: {
        ...mapActions('cart', {
            updateBottle: 'updateBottle',
            removeBottle: 'removeBottle'
        }),
        onChangeQuantity(cnt) {
            this.updateBottle({ id: this.id, cnt: cnt })
        },
        removeFromLK() {
            this.removeBottle({ id: this.id })
        }
    }
}
</script>

<!-- style in bem components cart-page -->
