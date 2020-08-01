<template lang="pug">
    form.delivery-form(@submit.prevent="onSubmit")
        delivery-type-list(
            :delivery-types="deliveryTypes"
            @change-type="onChangeType"
        )
        .field
            input-text(
                :key="address.name"
                :required="address.required"
                :name="address.name"
                :value="address.value"
                @input="onInput($event)"
                @validate="onValidate($event)"
                :placeholder="address.placeholder"
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
        address: {
            placeholder: 'Адрес(улица, дом, подъезд, квартира)',
            name: 'address',
            value: '',
            required: true,
            isValid: false
        },
        date: null,
        time: null
    }),
    props: {
        showDateTime: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryTypes']),
        isValidForm() {
            return (
                this.address.isValid &&
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
                    type: this.type,
                    address: this.address.value,
                    date: this.date,
                    time: this.time
                })
            }
        },
        onChangeType(value) {
            this.type = value
        },
        onInput(data) {
            this.address.value = data.value
        },
        onValidate(data) {
            this.address.isValid = data.isValid
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
            this.address.value = this.selectDelivery.address
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
