<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .auth-form.auth-form--register
        form(@submit.prevent="onSubmit")
            .field(
                v-for="item in form"
                :key="item.name"
            )
                input-text(
                    :mask="item.mask"
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
            .auth-form__agree
                +field-checkbox-rounded('agree')(@change="onAgree")
                    span Согласен с условиями
                    a(href='/info/') Публичной оферты и обработкой персональных данных
            .auth-form__error(v-if="error" v-html="error")
            .auth-form__button
                +button('default')(:disabled="!isValidForm") Зарегистрироваться
</template>

<script>
import InputText from '%vue%/components/InputText'
import { mapActions } from 'vuex'

export default {
    components: {
        InputText
    },
    data: () => ({
        agree: false,
        error: null,
        form: [
            {
                placeholder: 'Ф. И. О.',
                name: 'fio',
                value: '',
                required: true,
                isValid: false
            },
            {
                placeholder: 'Номер телефона',
                name: 'phone',
                value: '',
                required: true,
                isValid: false,
                mask: 'phone',
                validType: 'phone'
            },
            {
                placeholder: 'Электронная почта',
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
                isValidType: false,
                minLength: 6
            },
            {
                placeholder: 'Подтвердить пароль',
                type: 'password',
                name: 'password_confirm',
                value: '',
                required: true,
                isValid: false,
                validType: 'password',
                isValidType: false,
                minLength: 6
            }
        ]
    }),
    computed: {
        isValidForm() {
            return (
                !this.form.filter(el => !el.isValid).length &&
                this.agree &&
                !this.error
            )
        }
    },
    methods: {
        ...mapActions('user', {
            register: 'register'
        }),
        onSubmit() {
            if (this.isValidForm) {
                this.register({
                    fio: this.form[this.getIndexByName('fio')].value,
                    email: this.form[this.getIndexByName('email')].value,
                    phone: this.form[this.getIndexByName('phone')].value,
                    password: this.form[this.getIndexByName('password')].value,
                    password_confirm: this.form[
                        this.getIndexByName('password_confirm')
                    ].value
                }).then(response => {
                    if (response.status) {
                        window.location = '/'
                    } else if (!response.status) {
                        this.error = response.error || 'Ошибка при регистрации!'
                    } else {
                        console.error('Unknown status from server!')
                    }
                })
            }
        },
        onAgree() {
            this.agree = !this.agree
        },
        getIndexByName(name) {
            return this.form.findIndex(el => el.name === name)
        },
        onInput(data, name) {
            this.form[this.getIndexByName(name)].value = data.value

            if (name === 'password_confirm') {
                this.onSamePassword()
            }

            if (this.error) {
                this.error = null
            }
        },
        onValidate(data, name) {
            this.form[this.getIndexByName(name)].isValid = data.isValid
        },
        onSamePassword() {
            const password = this.form[this.getIndexByName('password')]
            const passwordConfirm = this.form[
                this.getIndexByName('password_confirm')
            ]

            if (password.value !== passwordConfirm.value) {
                password.isValidType = true
                passwordConfirm.isValidType = true
            } else {
                password.isValidType = false
                passwordConfirm.isValidType = false
            }
        }
    }
}
</script>
