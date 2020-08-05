<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .auth-form.auth-form--login
        form(@submit.prevent="onSubmit")
            .field(
                v-for="item in form"
                :key="item.name"
            )
                input-text(
                    :required="item.required"
                    :name="item.name"
                    :type="item.type"
                    :value="item.value"
                    @input="onInput($event, item.name)"
                    @validate="onValidate($event, item.name)"
                    :placeholder="item.placeholder"
                    :valid-type="item.validType"
                    :is-valid-type="item.isValidType"
                    :min-length="item.minLength"
                )
            .auth-form__button
                +button('default')(:disabled="!isValidForm") Войти

</template>

<script>
import InputText from '%vue%/components/InputText'
import { mapActions } from 'vuex'

export default {
    components: {
        InputText
    },
    data: () => ({
        form: [
            {
                placeholder: 'Адрес электронная почта',
                name: 'email',
                value: '',
                required: true,
                isValid: false,
                validType: 'email'
            },
            {
                placeholder: 'Пароль',
                type: 'password',
                name: 'password',
                value: '',
                required: true,
                isValid: false,
                validType: 'password',
                isValidType: false
            }
        ]
    }),
    computed: {
        isValidForm() {
            return !this.form.filter(el => !el.isValid).length
        }
    },
    methods: {
        ...mapActions('user', {
            login: 'login'
        }),
        onSubmit() {
            if (this.isValidForm) {
                this.login({
                    email: this.form[this.getIndexByName('email')].value,
                    password: this.form[this.getIndexByName('password')].value
                }).then(response => {
                    if (response.status) {
                        window.location = '/'
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
