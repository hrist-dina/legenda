<template lang="pug">
    .checkout
        .container
            .checkout__header
                h1.h1 Оформление заказа
            .checkout__nav(v-if="!isWelcome")
                checkout-navigation(
                    v-if="isWithoutLogin"
                    :steps="withoutLogin"
                )
            .checkout__body
                .checkout__body-half
                    router-view
                .checkout__body-half
                    checkout-structure
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { CHECKOUT_FINAL, CHECKOUT_WELCOME } from '%vue%/store/checkout/state'
import CheckoutStructure from '%vue%/views/checkout/CheckoutStructure'
import CheckoutNavigation from '%vue%/views/checkout/CheckoutNavigation'
import { toggleAdditionalProducts } from '%common%/helper'

export default {
    components: {
        CheckoutStructure,
        CheckoutNavigation
    },
    computed: {
        ...mapState('checkout', ['steps', 'activeStep']),
        ...mapGetters('checkout', ['getHasLogin']),
        ...mapState('checkout', ['steps']),
        withoutLogin() {
            return this.steps.withoutLogin
        },
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
        ...mapActions('checkout', ['setActiveStep', 'getDataByName'])
    },
    created() {
        if (this.getHasLogin) {
            this.setActiveStep({ activeStep: CHECKOUT_FINAL })
        } else {
            this.setActiveStep({ activeStep: this.$route.name })
        }

        toggleAdditionalProducts()
    },
    watch: {
        activeStep() {
            if (this.$route.name !== this.activeStep) {
                this.$router.push({ name: this.activeStep })
            }
            this.getDataByName(this.$route.name).then(title => {
                if (!!title.length) {
                    document.title =
                        document.title !== title
                            ? `${document.title} | ${title}`
                            : title
                }
            })
        }
    }
}
</script>

<!-- style in bem components checkout -->
