<template lang="pug">
    .checkout__total
        .checkout__amount
            .checkout__amount-text Итого:
            .checkout__amount-block
                .checkout__amount-value {{ total }} Р
                .checkout__amount-bonus +{{ bonusWithText }}
        .checkout__policy
            label.checkbox
                input(type='checkbox' name='policy').checkbox__input
                .checkbox__text Принимаю
                    |
                    |
                    a(href='#') условия пользовательского соглашения
        .checkout__total-button
            include ../../../blocks/modules/ui-kit/ui-kit
            +button('Оформить заказ')(:disabled="!isEndStep")



</template>

<script>
import { mapGetters } from 'vuex'
import { declOfNum } from '%common%/formatters'
export default {
    computed: {
        ...mapGetters('cart', ['total', 'bonus']),
        bonusWithText() {
            return `${this.bonus} ${declOfNum(this.bonus, [
                'бонус',
                'бонуса',
                'бонусов'
            ])}`
        },
        isEndStep() {
            const name = this.$route.name
            return name === 'order' || name === 'payment'
        }
    }
}
</script>

<!-- style in bem components checkout -->
