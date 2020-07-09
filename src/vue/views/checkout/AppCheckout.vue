<template lang="pug">
    .checkout
        .container
            .checkout__header
                h1.h1 Оформление заказа
            .checkout__nav(v-if="!isWelcome")
                checkout-navigation(v-if="isWithoutLogin")
            .checkout__body
                .checkout__body-half
                    router-view
                .checkout__body-half
                    checkout-structure
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { CHECKOUT_WELCOME } from '%vue%/store/checkout/state'
import CheckoutStructure from '%vue%/views/checkout/CheckoutStructure'
import CheckoutNavigation from '%vue%/views/checkout/CheckoutNavigation'
import { toggleAdditionalProducts } from "%common%/helper"

export default {
    components: {
        CheckoutStructure,
        CheckoutNavigation
    },
    computed: {
        ...mapState('checkout', ['steps', 'hasLogin', 'activeStep']),
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
        this.setActiveStep({ activeStep: this.$route.name })
        toggleAdditionalProducts()
    },
    watch: {
        activeStep() {
            if (this.$route.name !== this.activeStep) {
                this.$router.push({ name: this.activeStep })
            }
            this.getDataByName(this.$route.name).then(title => {
                if (!!title.length) {
                    document.title = `${document.title} | ${title}`
                }
            })
        }
    }
}
</script>

<!-- style in bem components checkout -->
