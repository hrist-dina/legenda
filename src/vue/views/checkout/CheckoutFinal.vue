<template lang="pug">
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

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CheckoutDeliveryDatetime from './CheckoutDeliveryDatetime'

export default {
    components: {
        CheckoutDeliveryDatetime
    },
    data() {
        return {
            title: '',
            form: [],
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
        person() {
            return this.getPerson
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        }),
        onChangeDate(val) {
            this.date = val
        },
        onChangeTime(val) {
            this.time = val
        }
    },
    created() {
        if (!this.title) {
            this.getDataByName(this.activeStep).then(data => {
                this.title = !!this.customTitle ? this.customTitle : data
            })
        }
    }
}
</script>

<!-- style in bem components checkout -->
