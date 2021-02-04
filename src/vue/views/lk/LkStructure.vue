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
                    a(href='/info/') Публичной оферты
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
                    :limit="bottle.limit"
                    :is-limit="isLimit"
                    :can-be-zero="canBeZero"
                )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartItemLk from '%vue%/components/CartItemLk'
import {
    PAYMENT_BANK_CARD,
    PAYMENT_METHOD_WRITE_OFF
} from '%vue%/store/user/state'

export default {
    name: 'lk-structure',
    components: {
        CartItemLk
    },
    data: () => ({
        agree: false
    }),
    props: {
        isLimit: {
            type: Boolean,
            default: false
        },
        canBeZero: {
            type: Boolean,
            default: false
        },
        isEndStep: {
            type: Boolean,
            default: true
        },
        paymentMethod: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters('user', ['isValidPaymentType']),
        ...mapGetters('cart', {
            bottles: 'getBottles',
            bottlesLimit: 'getBottlesLimit'
        }),
        getBottles() {
            return this.isLimit
                ? this.bottlesLimit
                : this.bottles.map(i => ({
                      ...i,
                      cnt: this.handleCnt(i.cnt)
                  }))
        },
        total() {
            return this.getBottles.reduce(
                (tot, i) => tot + this.handleCnt(i.cnt),
                0
            )
        },
        getSelectedBottles() {
            return this.getBottles.reduce((tot, i) => {
                if (i.cnt > 0) {
                    tot.push({
                        id: i.id,
                        cnt: i.cnt
                    })
                }
                return tot
            }, [])
        },
        isLimitValidate() {
            return !this.isLimit ? this.isValidPaymentType : true
        },
        canOrder() {
            return (
                this.isLimitValidate &&
                this.getBottles.length &&
                this.agree &&
                this.isEndStep
            )
        }
    },
    methods: {
        ...mapActions('user', {
            handlerPayment: 'replenish'
        }),
        onClickSendOrder() {
            const payload = {
                products: this.getSelectedBottles,
                paymentMethod: this.paymentMethod
            }
            if (this.paymentMethod === PAYMENT_METHOD_WRITE_OFF) {
                payload.paymentType = PAYMENT_BANK_CARD
            }
            this.handlerPayment(payload)
        },
        onAgree() {
            this.agree = !this.agree
        },
        handleCnt(val) {
            return typeof val === 'undefined' ? 1 : val || 0
        }
    }
}
</script>

<!-- style in bem components checkout -->
