<template lang="pug">
include ../../../views/helpers/mixins
.checkout-delivery
    .checkout__thanks {{ fio }},
        br
        | укажите пожалуйста тип и адрес доставки:
    .checkout-delivery__type-list.delivery-type-list
        label.delivery-type(v-for="(type, i) in deliveryTypes" :key="type.code" )
            input(
                :key="type.code"
                type='radio'
                name="delivery_type"
                :value="type.code"
                @change="onChangeType"
                :checked="handleChecked(i, type.code)"
            ).delivery-type__input
            .delivery-type__data
                +icon(false)(:class="`icon-${type.code}`").delivery-type__icon
                .delivery-type__title {{ type.name }}
    form.form(@submit.prevent="onSubmit")
        .field
            input-text(
                :key="address.name"
                :required="address.required"
                :name="address.name"
                :value="address.value"
                @input="onInput($event, address.name)"
                @validate="onValidate($event,address.name)"
                :placeholder="address.placeholder"
            )
        checkout-delivery-datetime(
            :date="date"
            :time="time"
            @changeDate="onChangeDate"
            @changeTime="onChangeTime"
        )
        .checkout__button
            include ../../../blocks/components/ui-kit/ui-kit
            +button('default')(:disabled="!isValidForm") Далее
            checkout-back
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
import CheckoutBack from './CheckoutBack'
import CheckoutDeliveryDatetime from './CheckoutDeliveryDatetime'

export default {
    components: {
        InputText,
        CheckoutBack,
        CheckoutDeliveryDatetime
    },
    data: () => ({
        type: '',
        form: {
            address: {
                placeholder: 'Адрес(улица, дом, подъезд, квартира)',
                name: 'address',
                value: '',
                required: true,
                isValid: false
            }
        },
        date: null,
        time: null
    }),
    computed: {
        ...mapGetters('user', ['getPerson', 'getDeliveryTypes']),
        isValidForm() {
            return (
                !Object.values(this.form).filter(el => !el.isValid).length &&
                !!this.type.length &&
                !!this.date &&
                !!this.time
            )
        },
        fio() {
            return this.getPerson.fio
        },
        deliveryTypes() {
            return this.getDeliveryTypes
        },
        address() {
            return this.form.address
        }
    },
    methods: {
        ...mapActions('checkout', {
            onNext: 'next'
        }),
        ...mapActions('user', {
            handleDelivery: 'delivery'
        }),
        onSubmit() {
            if (this.isValidForm) {
                this.handleDelivery({
                    type: this.type,
                    address: this.form.address.value,
                    date: this.date,
                    time: this.time
                }).then(response => {
                    if (response) {
                        this.onNext()
                    }
                })
            }
        },
        onChangeType({ target }) {
            this.type = target.value
        },
        onInput(data, name) {
            this.form[name].value = data.value
        },
        onValidate(data, name) {
            this.form[name].isValid = data.isValid
        },
        handleChecked(i, code) {
            if (i === 0) {
                this.type = code
                return true
            }
            return false
        },
        onChangeDate(val) {
            this.date = val
        },
        onChangeTime(val) {
            this.time = val
        }
    }
}
</script>

<!-- style in bem components checkout -->
