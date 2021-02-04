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
                    )
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CheckoutNavigation from '%vue%/views/checkout/CheckoutNavigation'
import LkStructure from '%vue%/views/lk/LkStructure'

export default {
    name: 'lk-replenish',
    components: {
        CheckoutNavigation,
        LkStructure
    },
    computed: {
        ...mapState('checkout', ['replenish', 'activeStep'])
    },
    methods: {
        ...mapActions('checkout', ['setActiveStep'])
    },
    created() {
        this.setActiveStep({ activeStep: this.$route.name })
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
