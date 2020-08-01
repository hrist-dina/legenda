<template lang="pug">
include ../../../views/helpers/mixins
include ../../../blocks/components/ui-kit/ui-kit
.checkout-delivery
    .checkout__thanks {{ fio }},
        br
        | укажите пожалуйста тип и адрес доставки:
    delivery-form.checkout-delivery__form(
        @submit="onSubmit"
        @isValid="onValidForm"
    )
        .checkout__button(slot='submit')
            +button('default')(:disabled="!isValidForm") Далее
            checkout-back
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DeliveryForm from '%vue%/components/DeliveryForm'
import CheckoutBack from './CheckoutBack'

export default {
    components: {
        DeliveryForm,
        CheckoutBack
    },
    data: () => ({
        isValidForm: false
    }),
    computed: {
        ...mapGetters('user', ['getPerson']),
        fio() {
            return this.getPerson.fio
        }
    },
    methods: {
        ...mapActions('checkout', {
            onNext: 'next'
        }),
        ...mapActions('user', {
            handleDelivery: 'delivery'
        }),
        onSubmit(value) {
            if (this.isValidForm) {
                this.handleDelivery(value).then(response => {
                    if (response.status) {
                        this.onNext()
                    }
                })
            }
        },
        onValidForm(value) {
            this.isValidForm = value
        }
    }
}
</script>

<!-- style in bem components checkout -->
