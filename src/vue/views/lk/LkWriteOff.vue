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
                        :is-can-order="isCanOrder"
                    )
</template>

<script>
import { mapGetters } from 'vuex'
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
        ...mapGetters('user', ['isValidDate', 'isValidTime']),
        paymentMethod() {
            return PAYMENT_METHOD_WRITE_OFF
        },
        isCanOrder() {
            return this.isValidDate && this.isValidTime
        }
    }
}
</script>

<!-- style in bem components lk -->
