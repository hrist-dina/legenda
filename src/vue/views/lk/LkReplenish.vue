<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-tab
        section.lk-section
            article.lk-section__half
                .lk-section-nav-wrap.checkout__nav
                    checkout-navigation(
                        :steps="replenish"
                    ).checkout-nav--two.lk-section-nav
                .lk-section-body
                    checkout-navigation(
                        :steps="replenish"
                    ).lk-section-nav--mobile
                        template(slot="body")
                            .lk-replenish
                                    router-view
            article.lk-section__half
                .lk-section-order
                    lk-structure(
                        :can-be-zero="true"
                        :is-end-step="isEndStep"
                        :payment-method="paymentMethod"
                    )
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CheckoutNavigation from '%vue%/views/checkout/CheckoutNavigation'
import LkStructure from '%vue%/views/lk/LkStructure'
import {
    LK_REPLENISH_DELIVERY,
    LK_REPLENISH_PAYMENT
} from '%vue%/router/constants'
import { PAYMENT_METHOD_REPLENISH } from '%vue%/store/user/state'

export default {
    name: 'lk-replenish',
    components: {
        CheckoutNavigation,
        LkStructure
    },
    computed: {
        ...mapState('checkout', ['replenish', 'activeStep']),
        ...mapGetters('user', ['isValidPaymentType']),
        isEndStep() {
            return this.$route.name === LK_REPLENISH_DELIVERY
        },
        paymentMethod() {
            return PAYMENT_METHOD_REPLENISH
        }
    },
    methods: {
        ...mapActions('checkout', ['setActiveStep'])
    },
    created() {
        const routName = this.isValidPaymentType
            ? this.$route.name
            : LK_REPLENISH_PAYMENT
        this.setActiveStep({ activeStep: routName })
    },
    watch: {
        activeStep() {
            if (this.$route.name !== this.activeStep) {
                this.$router.push({ name: this.activeStep })
            }
        }
    }
}
</script>

<!-- style in bem components lk -->
