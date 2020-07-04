<template lang="pug">
    .cart-page
        .container
            .cart-page__header
                .cart-page__header-left
                    h2.cart-page__title Корзина
                .cart-page__header-center
                .cart-page__header-right
                    a(href='javascript:void(0)' @click.prevent="cleanCart" v-if="hasProducts").cart-page__clean Очистить корзину
            .cart-page__products
                .cart-page__list(v-if="hasProducts")
                    cart-item(
                        v-for="product in productsDetailed"
                        :key="product.id"
                        :id="product.id"
                        :link="product.link"
                        :title="product.title"
                        :img="product.img"
                        :desc="product.desc"
                        :price="product.price"
                        :quantity="product.cnt"
                    )
                .card-page__empty(v-else)
                    p Корзина пуста! Перейдите в
                        |
                        |
                        a(href="/catalog.html") каталог
            .cart-page__footer(v-if="hasProducts")
                .cart-page__footer-left
                .cart-page__footer-right
                    .cart-page__total Итого {{ total }} Р
                    .cart-page__to-order
                        router-link(:to="{name: 'welcome'}") Перейти к оформлению
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CartItem from '%vue%/components/CartItem'

export default {
    components: {
        CartItem
    },
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total', 'productsDetailed']),
        hasProducts() {
            return !!this.productsDetailed.length
        }
    },
    methods: {
        ...mapActions('cart', {
            cleanCart: 'clean'
        })
    }
}
</script>

<!-- style in bem components cart-page -->
