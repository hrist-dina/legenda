<template lang="pug">
    .checkout
        .container
            .checkout__header
                h1 Оформление заказа
            .checkout__body
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
import { mapGetters } from 'vuex'
import CartItem from '%vue%/components/CartItem'

export default {
    components: {
        CartItem
    },
    computed: {
        ...mapGetters('cart', ['productsDetailed'])
    }
}
</script>

<!-- style in bem components checkout -->
