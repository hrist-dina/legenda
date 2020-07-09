<template lang="pug">
    .checkout-stucture
        .checkout-stucture__total
            .checkout-stucture__total-data
                .checkout-stucture__total-title Итого к оплате:
                .checkout-stucture__total-value {{ total | ruble }}
            .checkout-stucture__total-button
            include ../../../blocks/components/ui-kit/ui-kit
            +button('order')(:disabled="!isEndStep" @click="onClickSendOrder") Оформить заказ
        .checkout-stucture__data
            .checkout-stucture__head
                .checkout-stucture__title Состав заказа
                .checkout-stucture__edit
                    router-link(:to="{name: 'cart'}").link.link--bordered Изменить
            .checkout-stucture__list
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
                    :in-order="true"
                )
</template>

<script>
import CartItem from '%vue%/components/CartItem'
import { mapActions, mapGetters } from 'vuex'
import { CHECKOUT_ORDER, CHECKOUT_PAYMENT } from "%vue%/store/checkout/state"

export default {
    components: {
        CartItem
    },
    computed: {
        ...mapGetters('cart', ['productsDetailed', 'total']),
        isEndStep() {
            const name = this.$route.name
            return name === CHECKOUT_PAYMENT || name === CHECKOUT_ORDER
        }
    },
    methods: {
        ...mapActions('user', {
            handlerPayment: 'payment'
        }),
        onClickSendOrder() {
            this.handlerPayment()
        }
    }
}
</script>

<!-- style in bem components checkout -->
