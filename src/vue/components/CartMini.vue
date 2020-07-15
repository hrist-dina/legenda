<template lang="pug">
    include ../../blocks/components/ui-kit/ui-kit
    .cart-mini
        .cart-mini__body
            .cart-mini__list
                cart-item(
                    v-for="product in products"
                    :key="product.id"
                    :id="product.id"
                    :link="product.link"
                    :title="product.title"
                    :img="product.img"
                    :desc="product.desc"
                    :price="product.price"
                    :quantity="product.cnt"
                    :inCartMini="true"
                )

        .cart-mini__footer
            .cart-mini__total
                span.cart-mini__total-title Итого:
                span.cart-mini__total-value {{ total | ruble }}
            .cart-mini__order
                +button-link('Оформить заказ', '/order', 'default')
</template>

<script>
import CartItem from '%vue%/components/CartItem'

export default {
    name: 'cart-mini',
    components: {
        CartItem
    },
    props: {
        products: {
            type: Array,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }
}
</script>
