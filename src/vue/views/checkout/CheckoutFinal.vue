<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .checkout-final
        .checkout-block
            .checkout-block__title Личные данные
            .checkout-block__body
                p.checkout-block__row {{ person.fio }}
                p.checkout-block__row {{ person.phone }}
                p.checkout-block__row {{ person.email }}
        .checkout-block
            .checkout-block__title Адрес доставки
            .checkout-block__body
                v-select(
                    placeholder="Выберите адрес доставки"
                    @input="$emit('change', $event)"
                    :options="deliveryItems"
                    :value="selectedDeliveryItem"
                )
                    div(slot="no-options") Не найден адрес доставки
        .checkout-block
            .checkout-block__title Когда доставить
            .checkout-block__body
                checkout-delivery-datetime(
                    :date="date"
                    :time="time"
                    @changeDate="onChangeDate"
                    @changeTime="onChangeTime"
                )
        .checkout-block
            .checkout-block__title Оплата
            .checkout-block__body
                app-select-payment(
                    @change="onChange"
                    :options="getPayment"
                    :value="selectPaymentType"
                )
        .checkout__checkbox-list
            .checkout__checkbox-item
                +field-checkbox-rounded('bonus', '', 'field-checkbox-rounded--dark')(
                    @change="onBonus"
                    :checked="isSpendBonus"
                )
                    | Списать бонусы
                    b (доступно {{ getBonus | bonus }})
            .checkout__checkbox-item
                +field-checkbox-rounded('bottle', '', 'field-checkbox-rounded--dark')(
                    @change="onBottle"
                    :checked="isSpendBottle"
                )
                    | Списать воду
                    b (доступно {{ getBottle | bottle }})
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CheckoutDeliveryDatetime from './CheckoutDeliveryDatetime'
import AppSelectPayment from '%vue%/components/AppSelectPayment'

export default {
    components: {
        CheckoutDeliveryDatetime,
        AppSelectPayment
    },
    data() {
        return {
            title: '',
            date: null,
            time: null
        }
    },
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapGetters('user', ['getPerson']),
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        ...mapState('user', [
            'selectPaymentType',
            'selectDelivery',
            'isSpendBonus',
            'isSpendBottle'
        ]),
        ...mapGetters('user', [
            'getPayment',
            'getDeliveryItems',
            'getBonus',
            'getBottle'
        ]),
        person() {
            return this.getPerson
        },
        deliveryItems() {
            return this.getDeliveryItems.map(i => ({
                code: i.address,
                label: i.address
            }))
        },
        selectedDeliveryItem() {
            const delivery = this.selectDelivery
            if (delivery && delivery.address) {
                return {
                    code: delivery.address,
                    label: delivery.address
                }
            }
            return this.deliveryItems ? this.deliveryItems[0] : {}
        },
        selectedDeliveryDate() {
            return this.selectDelivery ? this.selectDelivery.date : null
        },
        selectedDeliveryTime() {
            return this.selectDelivery ? this.selectDelivery.time : null
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        }),
        ...mapActions('user', {
            setPaymentType: 'setPaymentType',
            setDelivery: 'setDelivery',
            setIsBonus: 'setIsSpendBonus',
            setIsBottle: 'setIsSpendBottle'
        }),
        setType(val) {
            this.setPaymentType(val)
        },
        onChange(val) {
            this.setType(val)
        },
        onChangeDate(val) {
            this.date = val
            this.setDelivery({ ...this.selectDelivery, date: val })
        },
        onChangeTime(val) {
            this.time = val
            this.setDelivery({ ...this.selectDelivery, time: val })
        },
        onBonus() {
            this.setIsBonus(!this.isSpendBonus)
        },
        onBottle() {
            this.setIsBottle(!this.isSpendBottle)
        }
    },
    created() {
        if (!this.title) {
            this.getDataByName(this.activeStep).then(data => {
                this.title = !!this.customTitle ? this.customTitle : data
            })
        }

        this.date = this.selectedDeliveryDate
        this.time = this.selectedDeliveryTime
        this.setDelivery({
            ...this.selectDelivery,
            address: this.selectedDeliveryItem.code
        })
    }
}
</script>

<!-- style in bem components checkout -->
