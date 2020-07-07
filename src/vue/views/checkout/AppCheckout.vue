<template lang="pug">
    .checkout
        .container
            .checkout__header
                h1 Оформление заказа
            .checkout__body
                .checkout__body-half
                    checkout-steps
                .checkout__body-half
                    checkout-structure
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CheckoutStructure from '%vue%/views/checkout/CheckoutStructure'
import CheckoutSteps from '%vue%/views/checkout/CheckoutSteps'

export default {
    components: {
        CheckoutStructure,
        CheckoutSteps
    },
    computed: {
        ...mapState('checkout', ['hasLogin', 'activeStep'])
    },
    methods: {
        ...mapActions('checkout', ['setActiveStep', 'getDataByName'])
    },
    created() {
        this.setActiveStep({ activeStep: this.$route.name })
        document.querySelector('.js-order-additional').classList.add('hide')
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
