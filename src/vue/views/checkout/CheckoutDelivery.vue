<template lang="pug">
    .checkout__delivery
        .checkout__desc {{ fio }}, укажите пожалуйста тип и адрес доставки:
        .delivery
            .delivery-type-list
                label.delivery-type(v-for="type in deliveryTypes" :key="type.code" )
                    input(type='radio' name="delivery_type" :value="type.code" @change="onChangeType").delivery-type__input
                    .delivery-type__data
                        .delivery-type__icon
                        .delivery-type__title {{ type.name }}
            .delivery-message
                p Обратите внимание, что оборудование будет доставлено на тот же адрес, с которого было принято.
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
                .delivery-datatime

                .form__button
                    include ../../../blocks/modules/ui-kit/ui-kit
                    +button('Далее')(:disabled="!isValidForm")



</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
export default {
    components: {
        InputText
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
        }
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

.delivery-message {
    margin-top: 30px;
    font-size: 16px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
}
</style>
<!-- style in bem components checkout -->
