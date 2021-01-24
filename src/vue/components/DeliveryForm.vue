<template lang="pug">
    form.delivery-form(@submit.prevent="onSubmit")
        delivery-type-list(
            v-if="showDeliveryType"
            :delivery-types="deliveryTypes"
            :selected-type="deliverySelected"
            @change-type="onChangeType"
        )
        .field(
            v-for="item in fields"
            :key="item.name"
        )
            input-text(
                v-if="item.type !== 'select'"
                :required="item.required"
                :name="item.name"
                :value="item.value"
                @input="onInput($event, item.name)"
                @validate="onValidate($event, item.name)"
                :placeholder="item.placeholder"
            )
            v-select(
                v-else
                :placeholder="item.placeholder"
                @input="onChangeCity"
                :options="item.options"
                :value="item.value"
            ).delivery-form__select
                div(slot="no-options") Не найден
        delivery-datetime(
            v-if="showDateTime"
            :date="date"
            :time="time"
            :disabled-before-date="disabledBeforeDate"
            :disabled-after-date="disabledAfterDate"
            @changeDate="onChangeDate"
            @changeTime="onChangeTime"
        )
        template(v-if="showPhones")
            .field(
                v-for="(item, key) in phones"
                :key="key"
            )
                input-text(
                    :required="item.required"
                    :name="item.name"
                    :value="item.value"
                    @input="onInputPhone($event, key)"
                    @validate="onValidatePhone($event, key)"
                    :placeholder="item.placeholder"
                    :mask="item.mask"
                    :valid-type="item.validType"
                )
            .delivery-form__more
                include ../../blocks/components/ui-kit/ui-kit
                +link('Добавить еще')(@click.prevent="onClickMorePhone")
        .delivery-form__submit(v-if="hasSubmit")
            slot(name='submit')
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import InputText from '%vue%/components/InputText'
import DeliveryTypeList from '%vue%/components/DeliveryTypeList'
import DeliveryDatetime from '%vue%/components/DeliveryDatetime'

const initialPhone = {
    placeholder: 'Телефон',
    name: 'phones[]',
    value: '',
    required: false,
    isValid: true,
    mask: 'phone',
    validType: 'phone'
}

export default {
    components: {
        InputText,
        DeliveryTypeList,
        DeliveryDatetime
    },
    data: () => ({
        type: '',
        inputs: {
            title: {
                placeholder: 'Название адреса',
                name: 'title',
                value: '',
                required: true,
                isValid: false
            },
            city: {
                placeholder: 'Город',
                name: 'city',
                value: '',
                required: true,
                isValid: false,
                type: 'select',
                options: []
            },
            address: {
                placeholder: 'Адрес(улица, дом, подъезд, квартира)',
                name: 'address',
                value: '',
                required: true,
                isValid: false
            }
        },
        date: null,
        time: null,
        deliverySelected: null,
        phones: [initialPhone]
    }),
    props: {
        showDateTime: {
            type: Boolean,
            default: true
        },
        showTitleAndCity: {
            type: Boolean,
            default: false
        },
        showCity: {
            type: Boolean,
            default: false
        },
        showDeliveryType: {
            type: Boolean,
            default: true
        },
        showPhones: {
            type: Boolean,
            default: false
        },
        isNew: {
            type: Boolean,
            default: false
        },
        disabledBeforeDate: {
            type: [Date, null],
            default: () => null
        },
        disabledAfterDate: {
            type: [Date, null],
            default: () => null
        }
    },
    computed: {
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryTypes']),
        ...mapGetters('common', ['getCities']),
        cities() {
            return this.getCities.map(i => ({ ...i, label: i.name }))
        },
        fields() {
            if (this.showTitleAndCity) {
                return Object.values(this.inputs)
            }
            if (this.showCity) {
                return [this.inputs.city, this.inputs.address]
            }
            return [this.inputs.address]
        },
        isValidForm() {
            return (
                this.inputs.address.isValid &&
                !!this.type.length &&
                this.isValidDateTime &&
                this.isValidTitleAndCity &&
                this.isValidPhones
            )
        },
        isValidDateTime() {
            return this.showDateTime ? !!this.date && !!this.time : true
        },
        isValidTitleAndCity() {
            return this.showTitleAndCity
                ? !!this.inputs.title.value && !!this.inputs.city.value
                : true
        },
        isValidPhones() {
            if (!this.showPhones) {
                return true
            }
            return (
                this.phones.length === this.phones.filter(i => i.isValid).length
            )
        },
        deliveryTypes() {
            return this.getDeliveryTypes
        },
        hasSubmit() {
            return !!this.$slots.submit
        }
    },
    methods: {
        onSubmit() {
            if (this.isValidForm) {
                this.$emit('submit', {
                    title: this.inputs.title.value,
                    city: this.inputs.city.value,
                    type: this.type,
                    address: this.inputs.address.value,
                    date: this.date,
                    time: this.time,
                    phones: this.phones.map(i => i.value)
                })
            }
        },
        onChangeType(value) {
            this.type = value
        },
        onInput(data, name) {
            this.inputs[name].value = data.value
        },
        onValidate(data, name) {
            this.inputs[name].isValid = data.isValid
        },
        onChangeDate(val) {
            this.date = val
        },
        onChangeTime(val) {
            this.time = val
        },
        onChangeCity(val) {
            this.inputs.city.value = val
        },
        setDataToPhone(key, value, field) {
            const item = this.phones[key]
            if (item) {
                this.$set(this.phones, key, { ...item, [field]: value })
            }
        },
        onInputPhone(data, key) {
            this.setDataToPhone(key, data.value, 'value')
        },
        onValidatePhone(data, key) {
            this.setDataToPhone(key, data.isValid, 'isValid')
        },
        onClickMorePhone() {
            this.phones.push(initialPhone)
        }
    },
    created() {
        if (!this.isNew && this.selectDelivery) {
            this.inputs.address.value = this.selectDelivery.address
            this.inputs.title.value = this.selectDelivery.title
            if (
                this.selectDelivery.city &&
                this.selectDelivery.city.name &&
                this.selectDelivery.city.code &&
                this.selectDelivery.city.label
            ) {
                this.inputs.city.value = this.selectDelivery.city
            }
            this.date = this.selectDelivery.date
            this.time = this.selectDelivery.time
            this.deliverySelected = this.selectDelivery.type
        }

        if (this.showTitleAndCity || this.showCity) {
            if (this.cities) {
                this.inputs.city.options = this.cities
            }
        }

        if (this.showPhones && this.selectDelivery) {
            const phones = this.selectDelivery.phones
            if (phones.length) {
                this.phones = phones.map(i => ({ ...initialPhone, value: i }))
            } else {
                this.phones = [initialPhone]
            }
        }
    },
    watch: {
        isValidForm: function () {
            this.$emit('isValid', this.isValidForm)
        }
    }
}
</script>

<!-- style in bem components delivery -->
