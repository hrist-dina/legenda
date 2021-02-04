<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-replenish-delivery
        .checkout-block
            .checkout-block__title
                span Адрес доставки
                +link('Добавить адрес', false, 'bordered')(
                    @click.prevent="onAddAddress"
                ).checkout-block__edit
            .checkout-block__options
                +field-radio(false, 'all', 'Все адреса', 'checkout-block__options-radio')(
                    v-model="type"
                )
                +field-radio(false, 'one', 'Выбрать один', 'checkout-block__options-radio')(
                    v-model="type"
                )
            .checkout-block__body
                v-select(
                    v-if="type === 'one'"
                    placeholder="Выберите адрес доставки"
                    @input="onSelectAddress"
                    :options="deliveryItems"
                    :value="selectedDeliveryItem"
                )
                    div(slot="no-options") Не найден адрес доставки
                .checkout-block__list-wrap(v-else)
                    ul.checkout-block__list(v-if="deliveryItems.length")
                        li.checkout-block__list-item(
                            v-for="(item, i) in deliveryItems"
                        ) {{ `${i + 1}. ${item.label}`}}
                    span.checkout-block__list-item(v-else) Адресов нет
            .lk-replenish__button
                +button('back')(
                    @click.prevent="backReplenish"
                ) Назад
        modal-add-delivery(
            :show-modal="showModalAddress",
            :delivery-form="deliveryFormPros"
            @close="showModalAddress = false"
        )
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AppModal from '%vue%/components/AppModal'
import DeliveryForm from '%vue%/components/DeliveryForm'
import ModalAddDelivery from '%vue%/components/ModalAddDelivery'
import { getDeliveryLabel } from '%common%/formatters'

export default {
    name: 'lk-replenish-delivery',
    components: {
        AppModal,
        DeliveryForm,
        ModalAddDelivery
    },
    data: () => ({
        type: 'one',
        showModalAddress: false
    }),
    computed: {
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryItems']),
        deliveryItems() {
            return this.getDeliveryItems.map(i => ({
                ...i,
                code: i.address,
                label: getDeliveryLabel(i),
                type: 'one'
            }))
        },
        selectedDeliveryItem() {
            const delivery = this.selectDelivery
            if (delivery && delivery.address) {
                return {
                    ...delivery,
                    code: delivery.address,
                    label: getDeliveryLabel(delivery),
                    type: 'one'
                }
            }
            return this.deliveryItems ? this.deliveryItems[0] : {}
        },
        deliveryFormPros: () => ({
            isNew: true,
            showTitleAndCity: true,
            showDateTime: false
        })
    },
    methods: {
        ...mapActions('checkout', ['backReplenish']),
        ...mapActions('user', {
            setDelivery: 'setDelivery'
        }),
        onSelectAddress(val) {
            this.setDelivery({
                ...this.selectDelivery,
                id: val.id,
                address: val.address,
                type: val.type
            })
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
    },
    watch: {
        type(val) {
            if (val === 'all') {
                this.setDelivery({
                    id: val,
                    type: 'all'
                })
            }
        }
    }
}
</script>

<!-- style in bem components lk -->
