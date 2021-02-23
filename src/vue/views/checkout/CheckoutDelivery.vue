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
        :disabled-before-date="getDisabledBeforeDateDelivery"
        :disabled-after-date="getDisabledAfterDateDelivery"
        :dates-delivery="getDatesDelivery"
    )
        template(#submit)
            .checkout__error(v-if="errorMessage" v-html="errorMessage")
            .checkout__button(slot='submit')
                checkout-back
                +button('default')(:disabled="!isValidForm") Далее
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DeliveryForm from '%vue%/components/DeliveryForm'
import CheckoutBack from './CheckoutBack'
import { orderDateTimeOptions } from '%vue%/mixins/delivery'

export default {
    components: {
        DeliveryForm,
        CheckoutBack
    },
    mixins: [orderDateTimeOptions],
    data: () => ({
        isValidForm: false,
        errorMessage: null
    }),
    computed: {
        ...mapGetters('user', [
            'getPerson',
            'getDisabledBeforeDateDelivery',
            'getDisabledAfterDateDelivery',
            'getDatesDelivery'
        ]),
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
                        this.errorMessage = null
                        this.onNext()
                    } else {
                        this.errorMessage = response.error || 'Ошибка!'
                    }
                })
            }
        },
        onValidForm(value) {
            this.isValidForm = value
        }
    },
    created() {
        // Передаем 0, чтобы получить общие даты о доставки
        // Так как на этом этапе у нас нет созданного адреса
        this.orderDate({ id: 0 })
    }
}
</script>

<!-- style in bem components checkout -->
