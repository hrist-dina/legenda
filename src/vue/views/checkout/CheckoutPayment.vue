<template lang="pug">
    .checkout__payment
        .checkout__title {{ title }}
        .checkout__desc Готово. Последний шаг - выбор способа оплаты
        .checkout__payment-type
            select
                option(v-for="item in payment" :key="item.code" :value="item.code") {{ item.name }}
        .checkout__payment-params
            .checkout__payment-checkbox
                label
                    input(type='checkbox' name='bonus' value='800')
                    span Списать бонусы
            .checkout__payment-checkbo
                label
                    input(type='checkbox' name='water' value=4)
                    span Списать воду
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data() {
        return {
            title: ''
        }
    },
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapState('checkout', ['activeStep']),
        ...mapGetters('user', ['getPayment']),
        payment() {
            return this.getPayment
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        })
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
