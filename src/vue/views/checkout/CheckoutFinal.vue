<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .checkout-final
        .checkout-block
            .checkout-block__title
                span Личные данные
                +link('Изменить', false, 'bordered')(
                    @click.prevent="onEditPersonalData"
                ).checkout-block__edit
            .checkout-block__body
                p.checkout-block__row {{ person.fio }}
                p.checkout-block__row {{ person.email }}
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
            .checkout__checkbox-item(v-if="getBonus > 0")
                +field-checkbox-rounded('bonus', '', 'field-checkbox-rounded--dark')(
                    @change="onBonus"
                    :checked="isSpendBonus"
                )
                    | Списать бонусы
                    b (доступно {{ getBonus | bonus }})
            .checkout__checkbox-item(v-if="getBottle > 0")
                +field-checkbox-rounded('bottle', '', 'field-checkbox-rounded--dark')(
                    @change="onBottle"
                    :checked="isSpendBottle"
                )
                    | Списать воду
                    b (доступно {{ getBottle | bottle }})
        app-modal(:showModal="showModalPersonalData" @close="showModalPersonalData = false")
            template(#header)
                h3 Изменить личные данные
            personal-data-form(
                @submit="onSubmitModalPersonalData"
                @isValid="onValidModalPersonalData"
                :has-phone="false"
            ).checkout-personal-data__form
                template(#submit)
                    .error-message(v-if="!!errorMessage") {{ errorMessage }}
                    +button('default')(
                        :disabled="!isValidModalPersonalData || isSubmittingModalPersonalData"
                        :class="{'is-loading': isSubmittingModalPersonalData}"
                    ) Сохранить
        modal-add-delivery(
            :showModal="showModalAddress"
            :delivery-form="deliveryFormPros"
            @close="showModalAddress = false"
        )
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AppSelectPayment from '%vue%/components/AppSelectPayment'
import AppModal from '%vue%/components/AppModal'
import DeliveryDatetime from '%vue%/components/DeliveryDatetime'
import PersonalDataForm from '%vue%/components/PersonalDataForm'
import ModalAddDelivery from '%vue%/components/ModalAddDelivery'
import { getDeliveryLabel } from '%common%/formatters'
import { orderTimeOptions } from '%vue%/mixins/delivery'

export default {
    components: {
        DeliveryDatetime,
        AppSelectPayment,
        AppModal,
        PersonalDataForm,
        ModalAddDelivery
    },
    mixins: [orderTimeOptions],
    data: () => ({
        errorMessage: '',
        date: null,
        time: null,
        showModalPersonalData: false,
        isValidModalPersonalData: false,
        isSubmittingModalPersonalData: false,
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
            'getPerson',
            'getDisabledBeforeDateDelivery',
            'getDisabledAfterDateDelivery'
        ]),
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
                ...i,
                code: i.id,
                label: getDeliveryLabel(i)
            }))
        },
        selectedDeliveryItem() {
            const delivery = this.selectDelivery
            if (delivery && delivery.address) {
                return {
                    ...delivery,
                    code: delivery.id,
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
                disabledAfterDate: this.getDisabledAfterDateDelivery
            }
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
            setIsBottle: 'setIsSpendBottle',
            handleEditPersonalData: 'editPersonalData'
        }),
        setType(val) {
            this.setPaymentType(val)
        },
        onChange(val) {
            this.setType(val)
        },
        onChangeDate(val) {
            console.log(val)
            this.date = val
            this.setDelivery({ ...this.selectDelivery, date: val })
            this.setOptionsOrderTime(val)
        },
        setOptionsOrderTime(date) {
            this.getOptionsOrderTime({ date: date }).then(
                res => (this.timeOptions = res)
            )
        },
        onChangeTime(val) {
            this.time = val
            this.setDelivery({ ...this.selectDelivery, time: val })
        },
        onSelectAddress(val) {
            this.setDelivery({ ...this.selectDelivery, ...val })
            if (this.date) {
                this.setOptionsOrderTime(this.date)
            }
        },
        onBonus() {
            this.setIsBonus(!this.isSpendBonus)
        },
        onBottle() {
            this.setIsBottle(!this.isSpendBottle)
        },
        onEditPersonalData() {
            this.showModalPersonalData = !this.showModalPersonalData
        },
        onValidModalPersonalData(value) {
            this.isValidModalPersonalData = value
        },
        onSubmitModalPersonalData(value) {
            if (this.isValidModalPersonalData) {
                this.isSubmittingModalPersonalData = true
                this.handleEditPersonalData(value)
                    .then(response => {
                        if (response) {
                            this.showModalPersonalData = false
                            this.errorMessage = ''
                        } else {
                            this.errorMessage = response.error
                        }
                        this.isSubmittingModalPersonalData = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isSubmittingModalPersonalData = false
                    })
            }
        },
        onAddAddress() {
            this.showModalAddress = !this.showModalAddress
        }
    },
    created() {
        this.date = this.selectedDeliveryDate
        this.time = this.selectedDeliveryTime
        this.setDelivery({
            ...this.selectDelivery,
            ...this.selectedDeliveryItem
        })
    },
    watch: {
        showModalPersonalData: function () {
            this.errorMessage = ''
        }
    }
}
</script>

<!-- style in bem components checkout -->
