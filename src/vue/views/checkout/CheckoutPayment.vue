<template lang="pug">
    .checkout-payment
        .checkout__title Готово!
        .checkout__thanks Последний шаг - выбор способа оплаты
        .checkout-payment__type
            app-select-payment(
                @change="onChange"
                :options="getPayment"
                :value="selectPaymentType"
            )
        .checkout__button
            checkout-back
</template>

<script>
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'
import { selectPayment } from '%vue%/mixins/payment'

export default {
    components: {
        CheckoutBack
    },
    mixins: [selectPayment]
}
</script>

<!-- style in bem components checkout -->
