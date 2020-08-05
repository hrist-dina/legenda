<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-replenish-payment
        app-select-payment(
            placeholder="Картой / Безналичный расчет"
            @change="onChange"
            :options="getPaymentOne"
            :value="selectPaymentType"
        )
        .lk-replenish__button
            +button('default')(
                @click.prevent="nextReplenish"
                :disabled="!selectPaymentType"
            ) Далее
</template>

<script>
import { selectPayment } from '%vue%/mixins/payment'
import { mapActions } from 'vuex'

export default {
    name: 'lk-replenish-payment',
    mixins: [selectPayment],
    methods: {
        ...mapActions('checkout', ['nextReplenish', 'setActiveStep'])
    },
    computed: {
        getPaymentOne() {
            return this.getPayment.filter(i => i.code !== 'money')
        }
    }
}
</script>

<!-- style in bem components lk -->
