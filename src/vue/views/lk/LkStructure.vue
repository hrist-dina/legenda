<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-stucture
        .lk-stucture__total
            .lk-stucture__total-head
                .lk-stucture__total-data
                    .lk-stucture__total-title Итого:
                    .lk-stucture__total-value {{ total | bottle }}
                .lk-stucture__total-button
                    +button('order')(:disabled="!canOrder" @click="onClickSendOrder") Оформить заказ
            .lk-stucture__agree
                +field-checkbox-rounded('agree')(@change="onAgree")
                    span Согласен с условиями
                    a(href='#') Публичной оферты
        .lk-stucture__data
            .lk-stucture__list
                cart-item-lk(
                    v-for="bottle in getBottles"
                    :key="bottle.id"
                    :id="bottle.id"
                    :link="bottle.link"
                    :title="bottle.title"
                    :img="bottle.img"
                    :desc="bottle.desc"
                    :quantity="bottle.cnt"
                )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartItemLk from '%vue%/components/CartItemLk'

export default {
    name: 'lk-structure',
    components: {
        CartItemLk
    },
    data: () => ({
        agree: false
    }),
    computed: {
        ...mapGetters('user', ['isValidPaymentType']),
        ...mapGetters('cart', ['getBottles']),
        total() {
            return this.getBottles.reduce((tot, i) => tot + i.cnt, 0)
        },
        canOrder() {
            return (
                this.isValidPaymentType && this.getBottles.length && this.agree
            )
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
