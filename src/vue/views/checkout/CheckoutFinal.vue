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
        delivery-address
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
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AppSelectPayment from '%vue%/components/AppSelectPayment'
import AppModal from '%vue%/components/AppModal'
import DeliveryDatetime from '%vue%/components/DeliveryDatetime'
import PersonalDataForm from '%vue%/components/PersonalDataForm'
import DeliveryAddress from '%vue%/components/DeliveryAddress'

export default {
    components: {
        DeliveryAddress,
        DeliveryDatetime,
        AppSelectPayment,
        AppModal,
        PersonalDataForm
    },
    data: () => ({
        errorMessage: '',
        showModalPersonalData: false,
        isValidModalPersonalData: false,
        isSubmittingModalPersonalData: false
    }),
    props: {
        isAddedAddress: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters('user', ['getPerson']),
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        ...mapState('user', [
            'selectPaymentType',
            'isSpendBonus',
            'isSpendBottle'
        ]),
        ...mapGetters('user', ['getPayment', 'getBonus', 'getBottle']),
        person() {
            return this.getPerson
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        }),
        ...mapActions('user', {
            setPaymentType: 'setPaymentType',
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
        }
    },
    watch: {
        showModalPersonalData: function () {
            this.errorMessage = ''
        }
    }
}
</script>

<!-- style in bem components checkout -->
