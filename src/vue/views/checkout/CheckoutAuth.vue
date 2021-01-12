<template lang="pug">
    .checkout-auth
        .checkout__title.checkout__title--auth Авторизация
        form.form(@submit.prevent="onSubmit")
            .field(v-for="item in form")
                input-text(
                    :key="item.name"
                    :required="item.required"
                    :name="item.name"
                    :value="item.value"
                    @input="onInput($event, item.name)"
                    @validate="onValidate($event, item.name)"
                    :placeholder="item.placeholder"
                    :type="item.type"
                )
            .checkout__button
                include ../../../blocks/components/ui-kit/ui-kit
                +button('default')(:disabled="!isValidForm") Войти
                checkout-back
            .form__footer
                router-link(:to="linkToRestore").link.link--default Забыли пароль?
</template>

<script>
import { mapState, mapActions } from 'vuex'
import InputText from '%vue%/components/InputText'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'
import { CHECKOUT_RESTORE } from '%vue%/store/checkout/state'

export default {
    components: {
        InputText,
        CheckoutBack
    },
    data() {
        return {
            form: [
                {
                    placeholder: 'Логин',
                    name: 'login',
                    value: '',
                    required: true,
                    isValid: false,
                    type: 'text'
                },
                {
                    placeholder: 'Пароль',
                    name: 'password',
                    value: '',
                    required: true,
                    isValid: false,
                    type: 'password'
                }
            ]
        }
    },
    computed: {
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        isValidForm() {
            return !this.form.filter(el => !el.isValid).length
        },
        linkToRestore() {
            return { name: CHECKOUT_RESTORE }
        }
    },
    methods: {
        ...mapActions('checkout', {
            onNext: 'next'
        }),
        ...mapActions('user', { login: 'login' }),
        onSubmit() {
            if (this.isValidForm) {
                this.login({
                    email: this.form[this.getIndexByName('login')].value,
                    password: this.form[this.getIndexByName('password')].value
                }).then(response => {
                    if (response.status) {
                        this.onNext()
                    }
                })
            }
        },
        getIndexByName(name) {
            return this.form.findIndex(el => el.name === name)
        },
        onInput(data, name) {
            this.form[this.getIndexByName(name)].value = data.value
        },
        onValidate(data, name) {
            this.form[this.getIndexByName(name)].isValid = data.isValid
        }
    }
}
</script>

<!-- style in bem components checkout -->
