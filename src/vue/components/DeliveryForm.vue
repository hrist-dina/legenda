<template lang="pug">
    form.delivery-form(@submit.prevent="onSubmit")
        delivery-type-list(
            :delivery-types="deliveryTypes"
            @change-type="onChangeType"
        )
        .field(
            v-for="item in fields"
            :key="item.name"
        )
            input-text(
                :required="item.required"
                :name="item.name"
                :value="item.value"
                @input="onInput($event, item.name)"
                @validate="onValidate($event, item.name)"
                :placeholder="item.placeholder"
            )
        delivery-datetime(
            v-if="showDateTime"
            :date="date"
            :time="time"
            @changeDate="onChangeDate"
            @changeTime="onChangeTime"
        )
        .delivery-form__submit(v-if="hasSubmit")
            slot(name='submit')
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import InputText from '%vue%/components/InputText'
import DeliveryTypeList from '%vue%/components/DeliveryTypeList'
import DeliveryDatetime from '%vue%/components/DeliveryDatetime'

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
                isValid: false
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
        time: null
    }),
    props: {
        showDateTime: {
            type: Boolean,
            default: true
        },
        showTitleAndCity: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryTypes']),
        fields() {
            if (this.showTitleAndCity) {
                return Object.values(this.inputs)
            }
            return [this.inputs.address]
        },
        isValidForm() {
            return (
                this.inputs.address.isValid &&
                !!this.type.length &&
                this.isValidDateTime
            )
        },
        isValidDateTime() {
            return this.showDateTime ? !!this.date && !!this.time : true
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
                    time: this.time
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
        }
    },
    created() {
        if (this.selectDelivery) {
            this.inputs.address.value = this.selectDelivery.address
            this.date = this.selectDelivery.date
            this.time = this.selectDelivery.time
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
