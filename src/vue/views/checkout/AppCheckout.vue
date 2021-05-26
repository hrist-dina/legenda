<template lang="pug">
    .checkout
        .container
            .checkout__header
                h1.h1 Оформление заказа
            .checkout__nav(v-if="!isWelcome && isWithoutLogin")
                checkout-navigation(
                    v-if="isWithoutLogin"
                    :steps="withoutLogin"
                )
            .checkout__body
                .checkout__body-half
                    template(v-if="isWithoutLogin")
                        checkout-navigation(
                            :steps="withoutLogin"
                        )
                            template(slot="body")
                                router-view
                    template(v-else)
                        router-view
                .checkout__body-half
                    checkout-structure
        modal-select-type
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { CHECKOUT_FINAL, CHECKOUT_WELCOME } from '%vue%/store/checkout/state'
import CheckoutStructure from '%vue%/views/checkout/CheckoutStructure'
import CheckoutNavigation from '%vue%/views/checkout/CheckoutNavigation'
import ModalSelectType from '%vue%/components/ModalSelectType'
import { toggleAdditionalProducts } from '%common%/helper'

export default {
    components: {
        CheckoutStructure,
        CheckoutNavigation,
        ModalSelectType
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
        },
        getRouteName() {
            return this.$route.name
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
            if (this.getRouteName !== this.activeStep) {
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
        },
        getRouteName(route) {
            // Дополнительная проверка при смене навигации нативными стрелками браузера
            if (route !== this.activeStep) {
                this.setActiveStep({ activeStep: route })
            }
        }
    }
}
</script>

<!-- style in bem components checkout -->
