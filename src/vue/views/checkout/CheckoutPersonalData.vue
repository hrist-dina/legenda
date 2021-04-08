<template lang="pug">
    .checkout-personal-data
        .checkout__thanks
            |Спасибо, что выбрали нас! При первом заказе Вам нужно один раз ввести необходимую информацию:
        personal-data-form(
            @submit="onSubmit"
            @isValid="onValidForm"
            :has-birth-date="true"
        ).checkout-personal-data__form
            template(#submit)
                .checkout__error(v-if="errorMessage" v-html="errorMessage")
                .checkout__button
                    include ../../../blocks/components/ui-kit/ui-kit
                    checkout-back
                    +button('default')(:disabled="!isValidForm") Далее

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'
import PersonalDataForm from '%vue%/components/PersonalDataForm'

export default {
    components: {
        PersonalDataForm,
        CheckoutBack
    },
    data: () => ({
        isValidForm: false,
        errorMessage: null
    }),
    computed: {
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        ...mapGetters('user', ['isAuth', 'getPerson'])
    },
    methods: {
        ...mapActions('checkout', {
            onNext: 'next'
        }),
        ...mapActions('user', {
            register: 'register'
        }),
        onSubmit(value) {
            // Если пользователь вернулся назад, то он уже авторизован.
            // Проверяем, что он ничего не менял в форме, и показываем след. экран
            // Либо идем дальше на регистрацию
            if (this.isAuth) {
                const person = this.getPerson
                const data = {}
                for (let v in value) {
                    if (person.hasOwnProperty(v)) {
                        data[v] = person[v]
                    }
                }
                if (!this.isDirty(value, data)) {
                    this.onNext()
                    return
                }
            }
            if (this.isValidForm) {
                this.register(value).then(response => {
                    if (response.status) {
                        this.errorMessage = null
                        this.onNext()
                    } else {
                        this.errorMessage = response.error || 'Ошибка!'
                    }
                })
            }
        },
        isDirty(object1, object2) {
            return !Object.keys(object1).every(
                key => object1[key] === object2[key]
            )
        },
        onValidForm(value) {
            this.isValidForm = value
        }
    }
}
</script>

<!-- style in bem components checkout -->
