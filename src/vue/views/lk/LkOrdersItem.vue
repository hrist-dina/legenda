<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk-orders-item
        .lk-orders-item__head
            .lk-orders-item__data.lk-orders-item__data--number № {{ order.id }}
            .lk-orders-item__data {{ order.date }}
            .lk-orders-item__data Адрес доставки: {{ order.address }}
            .lk-orders-item__status(
                :class="`lk-orders-item__status--${order.status.code}`"
            ) {{ order.status.title }}
        .lk-orders-item__body
            .lk-orders-item__list
                .lk-orders-item__row(
                    v-for="item in orderList"
                )
                    .lk-orders-item__title
                        a(:href="item.link").lk-orders-item__link {{ item.title }}
                    .lk-orders-item__count {{ item.cnt}} шт.
                    .lk-orders-item__price
                        span.lk-orders-item__price-old(
                            v-if="item.totalOldPrice"
                        ) {{ item.totalOldPrice | thousand }}
                        span.lk-orders-item__price-value {{ item.totalPrice | ruble }}

            .lk-orders-item__actions
                .lk-orders-item__total {{ orderTotal | ruble }}
                +link-icon('Повторить заказ', 'repeat')(
                    @click.prevent="onRepeat"
                ).link--repeat.lk-orders-item__repeat


</template>

<script>
import { LK_ORDER_REPEAT } from '%vue%/router/constants'

export default {
    name: 'lk-orders-item',
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    computed: {
        orderList() {
            return this.order.list.map(i => ({
                ...i,
                totalPrice: i.price * i.cnt,
                totalOldPrice: i.priceOld * i.cnt
            }))
        },
        orderTotal() {
            return this.orderList.reduce((tot, i) => tot + i.totalPrice, 0)
        }
    },
    methods: {
        onRepeat() {
            this.$router.push({
                name: LK_ORDER_REPEAT,
                params: { number: this.order.id }
            })
        }
    }
}
</script>

<!-- style in bem components lk -->
