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
import { mapActions, mapGetters, mapState } from 'vuex'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'
import AppSelectPayment from '%vue%/components/AppSelectPayment'

export default {
    components: {
        CheckoutBack,
        AppSelectPayment
    },
    data() {
        return {
            title: ''
        }
    },
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapState('checkout', ['activeStep']),
        ...mapState('user', ['selectPaymentType']),
        ...mapGetters('user', ['getPayment'])
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        }),
        ...mapActions('user', {
            setPaymentType: 'setPaymentType'
        }),
        setType(val) {
            this.setPaymentType(val)
        },
        onChange(val) {
            this.setType(val)
        }
    },
    created() {
        if (!this.title) {
            this.getDataByName(this.activeStep).then(data => {
                this.title = !!this.customTitle ? this.customTitle : data
            })
        }
    }
}
</script>

<!-- style in bem components checkout -->
