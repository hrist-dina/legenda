<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-tab
        section.lk-section
            article.lk-section__half
                .lk-section-body
                    .lk-write-off
                        delivery-address
            article.lk-section__half
                .lk-section-order
                    lk-structure(
                        :is-limit="true"
                        :payment-method="paymentMethod"
                    )
</template>

<script>
import LkStructure from '%vue%/views/lk/LkStructure'
import DeliveryAddress from '%vue%/components/DeliveryAddress'
import { PAYMENT_METHOD_WRITE_OFF } from '%vue%/store/user/state'

export default {
    name: 'lk-write-off',
    components: {
        DeliveryAddress,
        LkStructure
    },
    computed: {
        paymentMethod() {
            return PAYMENT_METHOD_WRITE_OFF
        }
    }
}
</script>

<!-- style in bem components lk -->
