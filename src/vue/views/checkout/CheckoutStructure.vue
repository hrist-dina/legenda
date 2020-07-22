<template lang="pug">
    .checkout-stucture
        .checkout-stucture__total
            .checkout-stucture__total-head
                .checkout-stucture__total-data
                    .checkout-stucture__total-title Итого к оплате:
                    .checkout-stucture__total-value {{ total | ruble }}
                    .checkout-stucture__total-bonus(v-if="isAuthFinalStep") +{{ bonus | bonus }}
                .checkout-stucture__total-button(v-if="!isWelcome")
                    include ../../../blocks/components/ui-kit/ui-kit
                    +button('order')(:disabled="!canOrder" @click="onClickSendOrder") Оформить заказ
            .checkout-stucture__agree
                +field-checkbox-rounded('agree')(@change="onAgree")
                    span Согласен с условиями
                    a(href='#') Публичной оферты
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
import {
    CHECKOUT_BONUS_COEFFICIENT,
    CHECKOUT_FINAL,
    CHECKOUT_PAYMENT,
    CHECKOUT_WELCOME
} from '%vue%/store/checkout/state'

export default {
    components: {
        CartItem
    },
    data: () => ({
        agree: false
    }),
    computed: {
        ...mapGetters('user', ['isAuth', 'isValidCheckoutFinal']),
        ...mapGetters('cart', ['productsDetailed', 'total']),
        isEndStep() {
            const name = this.$route.name
            return name === CHECKOUT_PAYMENT || name === CHECKOUT_FINAL
        },
        isAuthFinalStep() {
            return this.isAuth && this.$route.name === CHECKOUT_FINAL
        },
        isWelcome() {
            return this.$route.name === CHECKOUT_WELCOME
        },
        canOrder() {
            if (this.isAuthFinalStep) {
                return this.isEndStep && this.agree && this.isValidCheckoutFinal
            } else {
                return this.isEndStep && this.agree && this.isValidCheckoutFinal
            }
        },
        bonus() {
            return Math.ceil(this.total * CHECKOUT_BONUS_COEFFICIENT)
        }
    },
    methods: {
        ...mapActions('user', {
            handlerPayment: 'payment'
        }),
        onClickSendOrder() {
            this.handlerPayment()
        },
        onAgree() {
            this.agree = !this.agree
        }
    }
}
</script>

<!-- style in bem components checkout -->
