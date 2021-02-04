<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-tab
        section.lk-section
            article.lk-section__half
                .lk-section-body
                    .lk-write-off
                        .checkout-block
                            .checkout-block__title
                                span.lk-section__title Доставка
                                +link('Добавить адрес', false, 'bordered')(
                                    @click.prevent="onAddAddress"
                                ).checkout-block__edit
                            .checkout-block__body
                                template(v-if="deliveryItems.length")
                                    v-select(
                                        placeholder="Выберите адрес доставки"
                                        @input="onSelectAddress"
                                        :options="deliveryItems"
                                        :value="selectedDeliveryItem"
                                    )
                                        div(slot="no-options") Не найден адрес доставки
                                template(v-else)
                                    span.checkout-block__list-item Адресов нет
            article.lk-section__half
                .lk-section-order
                    lk-structure(
                        :is-limit="true"
                        :payment-method="paymentMethod"
                    )
        modal-add-delivery(
            :show-modal="showModalAddress"
            :delivery-form="deliveryFormPros"
            @close="showModalAddress = false"
        )
</template>

<script>
import LkStructure from '%vue%/views/lk/LkStructure'
import ModalAddDelivery from '%vue%/components/ModalAddDelivery'
import { mapActions, mapGetters, mapState } from 'vuex'
import { getDeliveryLabel } from '%common%/formatters'
import { PAYMENT_METHOD_WRITE_OFF } from '%vue%/store/user/state'

export default {
    name: 'lk-write-off',
    components: {
        LkStructure,
        ModalAddDelivery
    },
    data: () => ({ showModalAddress: false }),
    computed: {
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryItems']),
        deliveryItems() {
            return this.getDeliveryItems.map(i => ({
                id: i.id,
                code: i.address,
                label: getDeliveryLabel(i)
            }))
        },
        selectedDeliveryItem() {
            const delivery = this.selectDelivery
            if (delivery && delivery.address) {
                return {
                    id: delivery.id,
                    code: delivery.address,
                    label: getDeliveryLabel(delivery)
                }
            }
            return this.deliveryItems ? this.deliveryItems[0] : {}
        },
        deliveryFormPros: () => ({
            isNew: true,
            showTitleAndCity: false,
            showDateTime: false,
            showCity: true
        }),
        paymentMethod() {
            return PAYMENT_METHOD_WRITE_OFF
        }
    },
    methods: {
        ...mapActions('user', {
            setDelivery: 'setDelivery'
        }),
        onSelectAddress(val) {
            this.setDelivery({ ...this.selectDelivery, ...val })
        },
        onAddAddress() {
            this.showModalAddress = !this.showModalAddress
        }
    },
    created() {
        const val = this.selectedDeliveryItem
        this.setDelivery({
            id: val.id,
            address: val.address,
            type: val.type
        })
    }
}
</script>

<!-- style in bem components lk -->
