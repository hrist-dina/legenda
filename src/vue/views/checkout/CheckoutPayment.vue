<template lang="pug">
    .checkout__payment
        .checkout__title Готово!
        .checkout__thanks Последний шаг - выбор способа оплаты
        .checkout__payment-type
            select
                option(v-for="item in payment" :key="item.code" :value="item.code") {{ item.name }}
        .checkout__button
            checkout-back
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'

export default {
    components: {
      CheckoutBack
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
        ...mapGetters('user', ['getPayment']),
        payment() {
            return this.getPayment
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        })
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
