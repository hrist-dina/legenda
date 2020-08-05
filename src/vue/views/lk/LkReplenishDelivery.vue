<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-replenish-delivery
        .checkout-block
            .checkout-block__title
                span Адрес доставки
                +link('Добавить адрес', false, 'bordered')(
                    @click.prevent="onAddAddress"
                ).checkout-block__edit
            .checkout-block__body
                v-select(
                    placeholder="Выберите адрес доставки"
                    @input="$emit('change', $event)"
                    :options="deliveryItems"
                    :value="selectedDeliveryItem"
                )
                    div(slot="no-options") Не найден адрес доставки
                .lk-replenish__button
            +button('back')(
                @click.prevent="backReplenish"
            ) Назад
        app-modal(:showModal="showModalAddress" @close="showModalAddress = false")
            template(#header)
                h3 Новый адрес
            delivery-form(
                :is-new="true"
                :show-title-and-city="true"
                :show-date-time="false"
                @submit="onSubmitModalAddress"
                @isValid="onValidModalAddress"
            )
                template(#submit)
                    .error-message(v-if="!!errorMessage") {{ errorMessage }}
                    +button('default')(
                        :disabled="!isValidModalAddress || isSubmittingModalAddress"
                        :class="{'is-loading': isSubmittingModalAddress}"
                    ) Сохранить
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AppModal from '%vue%/components/AppModal'
import DeliveryForm from '%vue%/components/DeliveryForm'

export default {
    name: 'lk-replenish-delivery',
    components: {
        AppModal,
        DeliveryForm
    },
    data: () => ({
        errorMessage: '',
        showModalAddress: false,
        isValidModalAddress: false,
        isSubmittingModalAddress: false
    }),
    computed: {
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryItems']),
        deliveryItems() {
            return this.getDeliveryItems.map(i => ({
                code: i.address,
                label: this.getDeliveryLabel(i)
            }))
        },
        getDeliveryLabel: () => delivery => {
            const city =
                delivery.city && delivery.city.name
                    ? `${delivery.city.name}, `
                    : ''
            return city + delivery.address
        },
        selectedDeliveryItem() {
            const delivery = this.selectDelivery
            if (delivery && delivery.address) {
                return {
                    code: delivery.address,
                    label: this.getDeliveryLabel(delivery)
                }
            }
            return this.deliveryItems ? this.deliveryItems[0] : {}
        }
    },
    methods: {
        ...mapActions('checkout', ['backReplenish']),
        ...mapActions('user', {
            handleDelivery: 'delivery'
        }),
        onAddAddress() {
            this.showModalAddress = !this.showModalAddress
        },
        onValidModalAddress(value) {
            this.isValidModalAddress = value
        },
        onSubmitModalAddress(value) {
            if (this.isValidModalAddress) {
                this.isSubmittingModalAddress = true
                this.handleDelivery(value)
                    .then(response => {
                        if (response) {
                            this.showModalAddress = false
                            this.errorMessage = ''
                        } else {
                            this.errorMessage = response.error
                        }
                        this.isSubmittingModalAddress = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isSubmittingModalAddress = false
                    })
            }
        }
    }
}
</script>

<!-- style in bem components lk -->
