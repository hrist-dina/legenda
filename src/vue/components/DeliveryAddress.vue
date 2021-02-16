<template lang="pug">
    include ../../blocks/components/ui-kit/ui-kit
    .checkout-block
        .checkout-block
            .checkout-block__title
                span Адрес доставки
                +link('Добавить адрес', false, 'bordered')(
                    v-if="isAddedAddress"
                    @click.prevent="onAddAddress"
                ).checkout-block__edit
            .checkout-block__body
                v-select(
                    placeholder="Выберите адрес доставки"
                    @input="onSelectAddress"
                    :options="deliveryItems"
                    :value="selectedDeliveryItem"
                )
                    div(slot="no-options") Не найден адрес доставки
        .checkout-block
            .checkout-block__title Когда доставить
            .checkout-block__body
                delivery-datetime(
                    :date="date"
                    :time="time"
                    :time-options="timeOptions"
                    :disabled-before-date="deliveryFormPros.disabledBeforeDate"
                    :disabled-after-date="deliveryFormPros.disabledAfterDate"
                    :dates-delivery="deliveryFormPros.datesDelivery"
                    @changeDate="onChangeDate"
                    @changeTime="onChangeTime"
                )
        modal-add-delivery(
            :showModal="showModalAddress"
            :delivery-form="deliveryFormPros"
            @close="showModalAddress = false"
        )
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AppModal from '%vue%/components/AppModal'
import DeliveryDatetime from '%vue%/components/DeliveryDatetime'
import ModalAddDelivery from '%vue%/components/ModalAddDelivery'
import { getDeliveryLabel } from '%common%/formatters'
import { orderDateTimeOptions } from '%vue%/mixins/delivery'

export default {
    components: {
        DeliveryDatetime,
        AppModal,
        ModalAddDelivery
    },
    mixins: [orderDateTimeOptions],
    data: () => ({
        date: null,
        time: null,
        showModalAddress: false,
        timeOptions: []
    }),
    props: {
        isAddedAddress: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters('user', [
            'getDisabledBeforeDateDelivery',
            'getDisabledAfterDateDelivery',
            'getDatesDelivery'
        ]),
        ...mapState('user', ['selectDelivery']),
        ...mapGetters('user', ['getDeliveryItems']),
        deliveryItems() {
            return this.getDeliveryItems.map(i => ({
                ...i,
                id: i.id,
                code: i.address,
                label: getDeliveryLabel(i)
            }))
        },
        selectedDeliveryItem() {
            const delivery = this.selectDelivery
            if (delivery && delivery.address) {
                return {
                    ...delivery,
                    id: delivery.id,
                    code: delivery.address,
                    label: getDeliveryLabel(delivery)
                }
            }
            return this.deliveryItems ? this.deliveryItems[0] : {}
        },
        selectedDeliveryDate() {
            return this.selectDelivery ? this.selectDelivery.date : null
        },
        selectedDeliveryTime() {
            return this.selectDelivery ? this.selectDelivery.time : null
        },
        deliveryFormPros() {
            return {
                isNew: true,
                showTitleAndCity: false,
                showDateTime: false,
                showCity: true,
                disabledBeforeDate: this.getDisabledBeforeDateDelivery,
                disabledAfterDate: this.getDisabledAfterDateDelivery,
                datesDelivery: this.getDatesDelivery
            }
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        }),
        ...mapActions('user', {
            setDelivery: 'setDelivery'
        }),
        onChangeDate(val) {
            this.date = val
            this.setDelivery({ ...this.selectDelivery, date: val })
            this.setOptionsOrderTime(val)
        },
        setOptionsOrderTime(date) {
            this.getOptionsOrderTime({ date: date }).then(
                res => (this.timeOptions = res)
            )
        },
        setOrderDate(delivery) {
            this.getOrderDate(delivery)
        },
        onChangeTime(val) {
            this.time = val
            this.setDelivery({ ...this.selectDelivery, time: val })
        },
        onSelectAddress(val) {
            this.setDelivery({ ...this.selectDelivery, ...val })
            this.getOrderDate(this.selectDelivery)
            this.cleanDateAndTime()
        },
        onAddAddress() {
            this.showModalAddress = !this.showModalAddress
        },
        cleanDateAndTime() {
            this.date = null
            this.time = null
        }
    },
    created() {
        this.date = this.selectedDeliveryDate
        this.time = this.selectedDeliveryTime
        const deliveryItem = this.selectedDeliveryItem
        this.setDelivery({
            ...this.selectDelivery,
            ...deliveryItem
        })
        this.getOrderDate(deliveryItem)
    },
    watch: {
        deliveryItems() {
            this.getOrderDate(this.selectDelivery)
            this.cleanDateAndTime()
        }
    }
}
</script>

<!-- style in bem components checkout -->
