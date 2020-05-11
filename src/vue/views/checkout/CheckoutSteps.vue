<template lang="pug">
    .checkout__steps
        .checkout__step
            .checkout__step-nav(v-if="!isWelcome")
                button(type='button' @click.prevent="onBack") <-
            .checkout__step-body
                router-view
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { CHECKOUT_WELCOME } from '%vue%/store/checkout/state'

export default {
    computed: {
        ...mapState('checkout', ['activeStep']),
        isWelcome() {
            return this.activeStep === CHECKOUT_WELCOME
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
