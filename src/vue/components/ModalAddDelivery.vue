<template lang="pug">
    include ../../blocks/components/ui-kit/ui-kit
    app-modal(:showModal="showModal" @close="close")
        template(#header)
            h3 Новый адрес
        delivery-form(
            :show-date-time="deliveryForm.showDateTime"
            :show-title-and-city="deliveryForm.showTitleAndCity"
            :show-city="deliveryForm.showCity"
            :show-delivery-type="deliveryForm.deliveryType"
            :show-phones="deliveryForm.showPhones"
            :is-new="deliveryForm.isNew"
            :disabled-before-date="deliveryForm.disabledBeforeDate"
            @submit="onSubmitModalAddress"
            @isValid="onValidModalAddress"
        )
            template(#submit)
                .error-message(v-if="!!errorMessage") {{ errorMessage }}
                +button('default')(
                    :disabled="!isValidModal || isSubmittingModal"
                    :class="{'is-loading': isSubmittingModal}"
                ) Сохранить

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppModal from '%vue%/components/AppModal'
import DeliveryForm from '%vue%/components/DeliveryForm'

export default {
    name: 'modal-add-delivery',
    components: {
        AppModal,
        DeliveryForm
    },
    data: () => ({
        errorMessage: '',
        isValidModal: false,
        isSubmittingModal: false
    }),
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        deliveryForm: {
            type: Object,
            default: () => ({
                showDateTime: false,
                showTitleAndCity: false,
                showCity: false,
                showPhones: false,
                deliveryType: false,
                isNew: false,
                disabledBeforeDate: null
            })
        }
    },
    computed: {
        ...mapGetters('user', { selectedDelivery: 'getSelectDelivery' })
    },
    methods: {
        ...mapActions('user', {
            handleDelivery: 'delivery'
        }),
        close() {
            this.$emit('close')
        },
        onValidModalAddress(value) {
            this.isValidModal = value
        },
        onSubmitModalAddress(value) {
            if (this.isValidModal) {
                this.isSubmittingModal = true
                if (
                    this.selectedDelivery &&
                    this.selectedDelivery.id &&
                    !this.deliveryForm.isNew
                ) {
                    value.id = this.selectedDelivery.id
                }
                this.handleDelivery(value)
                    .then(response => {
                        if (response) {
                            this.close()
                            this.errorMessage = ''
                        } else {
                            this.errorMessage = response.error
                        }
                        this.isSubmittingModal = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isSubmittingModal = false
                    })
            }
        }
    },
    watch: {
        showModal: function () {
            this.errorMessage = ''
        }
    }
}
</script>
