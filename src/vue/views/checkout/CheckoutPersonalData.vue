<template lang="pug">
    .checkout-personal-data
        .checkout__thanks
            |Спасибо, что выбрали нас! При первом заказе Вам нужно один ввести необходимую информацию:
        personal-data-form(
            @submit="onSubmit"
            @isValid="onValidForm"
        ).checkout-personal-data__form
            template(#submit)
                .checkout__button
                    include ../../../blocks/components/ui-kit/ui-kit
                    +button('default')(:disabled="!isValidForm") Далее
                    checkout-back

</template>

<script>
import { mapActions, mapState } from 'vuex'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'
import PersonalDataForm from '%vue%/components/PersonalDataForm'

export default {
    components: {
        PersonalDataForm,
        CheckoutBack
    },
    data: () => ({
        title: '',
        isValidForm: false
    }),
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapState('checkout', ['hasLogin', 'activeStep'])
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName',
            onNext: 'next'
        }),
        ...mapActions('user', {
            register: 'register'
        }),
        onSubmit(value) {
            if (this.isValidForm) {
                this.register(value).then(response => {
                    if (response) {
                        this.onNext()
                    }
                })
            }
        },
        onValidForm(value) {
            this.isValidForm = value
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
