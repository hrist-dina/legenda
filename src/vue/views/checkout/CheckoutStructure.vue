<template lang="pug">
    .checkout__stucture
        .checkout__stucture-title Состав заказа
        .checkout__stucture-list
            cart-item(
                v-for="product in productsDetailed"
                :key="product.id"
                :id="product.id"
                :title="product.title"
                :description="product.description"
                :price="product.price"
                :quantity="product.cnt"
                :has-order="false"
            )
</template>

<script>
import CartItem from '%vue%/components/CartItem'
import { mapGetters } from 'vuex'

export default {
    components: {
        CartItem
    },
    computed: {
        ...mapGetters('cart', ['productsDetailed'])
    },
    methods: {
        handleEmptyProducts() {
            if (this.productsDetailed.length === 0) {
                this.$router.push({ name: 'cart' })
            }
        },
        yesLogin() {
            this.setHasLogin({ hasLogin: true })
        },
        noLogin() {
            this.setHasLogin({ hasLogin: false })
        }
    },
    watch: {
        productsDetailed() {
            this.handleEmptyProducts()
        }
    },
    beforeMount() {
        this.handleEmptyProducts()
    }
}
</script>

<!-- style in bem components checkout -->
