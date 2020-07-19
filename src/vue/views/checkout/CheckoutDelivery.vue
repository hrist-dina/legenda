<template lang="pug">
    .checkout-delivery
        .checkout__thanks {{ fio }},
            br
            |
            | укажите пожалуйста тип и адрес доставки:
        .delivery
            .delivery-type-list
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
                        .delivery-type__icon
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
                .checkout-delivery__datetime
                    .checkout-delivery__datetime-part
                        app-date-picker(
                            :date="date"
                            @change="onChangeDate"
                            placeholder="Желаемая дата"
                        )
                    .checkout-delivery__datetime-part
                        app-time-picker(
                            :time="time"
                            @change="onChangeTime"
                            placeholder="Время"
                        )


                .checkout__button
                    include ../../../blocks/components/ui-kit/ui-kit
                    +button('default')(:disabled="!isValidForm") Далее
                    checkout-back



</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'
import AppDatePicker from '%vue%/components/AppDatePicker'
import AppTimePicker from '%vue%/components/AppTimePicker'

export default {
    components: {
        InputText,
        CheckoutBack,
        AppDatePicker,
        AppTimePicker
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
                !!this.type.length
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
                    address: this.form.address.value
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

<style lang="scss">
.delivery-type {
    margin-right: 20px;
    &-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    &__data {
        padding: 16px;
        box-sizing: border-box;
        background: #ffffff;
        box-shadow: 0 7px 250px rgba(0, 0, 0, 0.07);
        border-radius: 4px;
        border: 1px solid transparent;
        cursor: pointer;
    }

    &__input {
        display: none;
    }

    &__input:checked ~ &__data {
        background: #e9e9e9;
        border-color: #d6d6d6;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
    }
}
</style>
<!-- style in bem components checkout -->
