<template lang="pug">
    .checkout__steps
        .checkout__step
            .checkout__step-nav(v-if="!isWelcome")
                button(type='button' @click.prevent="onBack") <-
                checkout-navigation(v-if="isWithoutLogin")
            .checkout__step-body
                router-view
                checkout-total(v-if="isWithoutLogin")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { CHECKOUT_WELCOME } from '%vue%/store/checkout/state'
import CheckoutNavigation from '%vue%/views/checkout/CheckoutNavigation'
import CheckoutTotal from '%vue%/views/checkout/CheckoutTotal'

export default {
    components: {
        CheckoutNavigation,
        CheckoutTotal
    },
    computed: {
        ...mapState('checkout', ['activeStep', 'steps']),
        isWelcome() {
            return this.activeStep === CHECKOUT_WELCOME
        },
        isWithoutLogin() {
            return !!this.steps.withoutLogin.filter(
                el => el.name === this.activeStep
            ).length
        }
    },
    methods: {
        ...mapActions('checkout', {
            onBack: 'back'
        })
    }
}
</script>

<!-- style in bem components checkout -->
