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
                template(v-if="isLoading")
                    .cart-page__list
                        cart-item-skeleton(
                            v-for="product in products"
                            :key="product.id"
                        )
                template(v-else)
                    .cart-page__list(v-if="hasProducts" )
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
                        .cart-page__promocode
                        .cart-page__order
                            .cart-page__total
                                .cart-page__total-title Итого:
                                .cart-page__total-value {{ total | ruble }}
                            .cart-page__to-order
                                router-link(:to="{name: 'welcome'}").link.link--big К оформлению заказа
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CartItem from '%vue%/components/CartItem'
import CartItemSkeleton from '%vue%/components/CartItemSkeleton'
import Loader from '%vue%/components/Loader'
import { toggleAdditionalProducts } from '%common%/helper'

export default {
    components: {
        CartItem,
        CartItemSkeleton,
        Loader
    },
    computed: {
        ...mapState('cart', ['products']),
        ...mapState('products', ['isLoading']),
        ...mapGetters('cart', ['cnt', 'total', 'productsDetailed']),
        hasProducts() {
            return !!this.productsDetailed.length
        }
    },
    methods: {
        ...mapActions('cart', {
            cleanCart: 'clean'
        })
    },
    created() {
        toggleAdditionalProducts(false)
    }
}
</script>

<!-- style in bem components cart-page -->
