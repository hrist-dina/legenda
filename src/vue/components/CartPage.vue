<template lang="pug">
    .cart-page
        .container
            .cart-page__header
                .cart-page__header-left
                    h2.cart-page__title Корзина
                .cart-page__header-center
                .cart-page__header-right
                    a(href='javascript:void(0)' @click.prevent="cleanCart").cart-page__clean Очистить корзину
            .cart-page__products
                .cart-page__list(v-if="productsDetailed.length > 0")
                    cart-page-item(
                        v-for="product in productsDetailed"
                        :key="product.id"
                        :id="product.id"
                        :title="product.title"
                        :description="product.description"
                        :price="product.price"
                        :quantity="product.cnt"
                    )
                .card-page__empty(v-else)
                    p Корзина пуста! Перейдите в
                        |
                        |
                        a(href="catalog.html") каталог



</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CartPageItem from '%vue%/components/CartPageItem'

export default {
    components: {
        CartPageItem
    },
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total', 'productsDetailed'])
    },
    methods: {
        ...mapActions('cart', {
            cleanCart: 'clean'
        })
    }
}
</script>

<!-- style in bem components cart-page -->
