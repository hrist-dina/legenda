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
        :show-city="true"
        :show-birth-date="true"
        :disabled-before-date="getDisabledBeforeDateDelivery"
        :disabled-after-date="getDisabledAfterDateDelivery"
        :dates-delivery="getDatesDelivery"
    )
        template(#submit)
            .checkout__error(v-if="errorMessage" v-html="errorMessage")
            .checkout__button(slot='submit')
                checkout-back
                +button('default')(:disabled="!isValidForm") Далее
    app-modal(:show-modal="isShowModal" @close="onClose" :close-only-cross="true")
        template(#header)
            h3 Сообщение
        .modal-message(v-html="modalMessage")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DeliveryForm from '%vue%/components/DeliveryForm'
import AppModal from '%vue%/components/AppModal'
import CheckoutBack from './CheckoutBack'
import { orderDateTimeOptions } from '%vue%/mixins/delivery'
import { getStaticHtml } from '%common%/helper'

export default {
    components: {
        DeliveryForm,
        CheckoutBack,
        AppModal
    },
    mixins: [orderDateTimeOptions],
    data: () => ({
        isValidForm: false,
        errorMessage: null,
        isShowModal: true,
        modalMessage: null
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
        },
        onClose() {
            this.isShowModal = !this.isShowModal
        }
    },
    created() {
        // Передаем 0, чтобы получить общие даты о доставки
        // Так как на этом этапе у нас нет созданного адреса
        this.orderDate({ id: 0 })
    },
    mounted() {
        this.modalMessage =
            getStaticHtml('static-checkout-modal-message') ||
            'Вы успешно зарегистрировались. Ваш логин и пароль отправлены Вам на почту. Используйте их при повторном оформлении заказов.'
    }
}
</script>

<!-- style in bem components checkout -->
