<template lang="pug">
    include ../../views/helpers/mixins
    .delivery-type-list
        label.delivery-type(
            v-for="(type, i) in deliveryTypes"
            :key="type.code"
        )
            input(
                :key="type.code"
                type='radio'
                name="delivery_type"
                :value="type.code"
                @change="onChangeDeliveryType"
                :checked="checked(i, type.code)"
            ).delivery-type__input
            .delivery-type__data
                +icon(false)(
                    :class="`icon-${type.code}`"
                ).delivery-type__icon
                .delivery-type__title {{ type.name }}
</template>

<script>
export default {
    props: {
        deliveryTypes: {
            type: Array,
            required: true
        },
        selectedType: {
            type: [String, null]
        }
    },
    computed: {
        checked(el) {
            const selectedType = this.selectedType || this.deliveryTypes[0].code
            return (i, code) => {
                if (selectedType === code) {
                    el.changeType(code)
                    return true
                }
                return false
            }
        }
    },
    methods: {
        changeType(value) {
            this.$emit('change-type', value)
        },
        onChangeDeliveryType({ target }) {
            this.changeType(target.value)
        }
    }
}
</script>

<!-- style in bem components delivery -->
