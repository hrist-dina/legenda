<template lang="pug">
    .checkout
        .container
            .checkout__header
                h1.h1 Повторить заказ
            .checkout__body
                .checkout__body-half
                    checkout-final(
                        :is-added-address="false"
                    )
                .checkout__body-half
                    checkout-structure
</template>

<script>
import { mapActions } from 'vuex'
import CheckoutFinal from '%vue%/views/checkout/CheckoutFinal'
import CheckoutStructure from '%vue%/views/checkout/CheckoutStructure'
import { toggleAdditionalProducts } from '%common%/helper'

export default {
    components: {
        CheckoutFinal,
        CheckoutStructure
    },
    methods: {
        ...mapActions('user', ['orderRepeat'])
    },
    created() {
        this.orderRepeat({ number: this.$route.params.number })
        toggleAdditionalProducts()
    }
}
</script>

<!-- style in bem components lk -->
