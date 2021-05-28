<template lang="pug">
    .checkout-stucture
        .checkout-stucture__total
            .checkout-stucture__total-head
                .checkout-stucture__total-data
                    .checkout-stucture__total-title Итого к оплате:
                    .checkout-stucture__total-value {{ total | ruble }}
                    .checkout-stucture__total-bonus(
                        v-if="isAuthFinalStep && bonus > 0"
                    ) +{{ bonus | bonus }}
                .checkout-stucture__total-button(v-if="!isWelcome")
                    include ../../../blocks/components/ui-kit/ui-kit
                    +button('order')(
                        :disabled="!canOrder"
                        @click="onClickSendOrder"
                    ) Оформить заказ
            .checkout-stucture__agree(v-if="isShowAgree")
                +field-checkbox-rounded('agree')(@change="onAgree" checked="agree")
                    span Согласен с условиями
                    a(href='/info/') Публичной оферты и обработкой персональных данных
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
    CHECKOUT_FINAL,
    CHECKOUT_PAYMENT,
    CHECKOUT_RESTORE,
    CHECKOUT_WELCOME
} from '%vue%/store/checkout/state'
import { LK_ORDER_REPEAT } from '%vue%/router/constants'

export default {
    name: 'checkout-structure',
    components: {
        CartItem
    },
    data: () => ({
        agree: true,
        newBonus: null,
        newBonusWithPay: null
    }),
    computed: {
        ...mapGetters('user', [
            'isAuth',
            'isValidCheckoutFinal',
            'isSpendBonus'
        ]),
        ...mapGetters('cart', ['productsDetailed', 'total']),
        isEndStep() {
            const name = this.$route.name
            return name === CHECKOUT_PAYMENT || name === CHECKOUT_FINAL
        },
        isShowAgree() {
            return this.isEndStep || this.isRepeat
        },
        isAuthFinalStep() {
            return this.isAuth && this.$route.name === CHECKOUT_FINAL
        },
        isRepeat() {
            return this.isAuth && this.$route.name === LK_ORDER_REPEAT
        },
        isWelcome() {
            return this.$route.name === CHECKOUT_WELCOME
        },
        canOrder() {
            if (this.isRepeat) {
                return this.agree && this.isValidCheckoutFinal
            } else {
                return this.isEndStep && this.agree && this.isValidCheckoutFinal
            }
        },
        bonus() {
            return this.isSpendBonus ? this.newBonusWithPay : this.newBonus
        }
    },
    methods: {
        ...mapActions('user', {
            handlerPayment: 'payment',
            orderBonus: 'orderBonus'
        }),
        onClickSendOrder() {
            this.handlerPayment()
        },
        onAgree() {
            this.agree = !this.agree
        }
    },
    created() {
        this.orderBonus().then(response => {
            if (response.status) {
                this.newBonus = response.data.newBonus
                this.newBonusWithPay = response.data.newBonusWithPay
            }
        })
    }
}
</script>

<!-- style in bem components checkout -->
