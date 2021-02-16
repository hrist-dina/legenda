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
            .auth-form__error(v-if="error" v-html="error")
            .auth-form__button
                +button('default')(:disabled="!isValidForm") Войти
                router-link(:to="linkToRestore").link.link--default.auth-form__restore Забыли пароль?

</template>

<script>
import { AUTH_RESTORE } from '%vue%/router/auth'
import InputText from '%vue%/components/InputText'
import { mapActions } from 'vuex'

export default {
    components: {
        InputText
    },
    data: () => ({
        form: [
            {
                placeholder: 'Логин',
                name: 'login',
                value: '',
                required: true,
                isValid: false
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
        ],
        error: null
    }),
    computed: {
        isValidForm() {
            return !this.form.filter(el => !el.isValid).length
        },
        linkToRestore() {
            return { name: AUTH_RESTORE }
        }
    },
    methods: {
        ...mapActions('user', {
            login: 'login'
        }),
        onSubmit() {
            if (this.isValidForm) {
                this.login({
                    login: this.form[this.getIndexByName('login')].value,
                    password: this.form[this.getIndexByName('password')].value
                }).then(response => {
                    if (response.status) {
                        window.location = '/'
                    } else if (!response.status) {
                        this.error = response.error || 'Ошибка при авторизации!'
                    } else {
                        console.error('Unknown status from response auth form!')
                    }
                })
            }
        },
        getIndexByName(name) {
            return this.form.findIndex(el => el.name === name)
        },
        onInput(data, name) {
            this.form[this.getIndexByName(name)].value = data.value

            if (this.error) {
                this.error = null
            }
        },
        onValidate(data, name) {
            this.form[this.getIndexByName(name)].isValid = data.isValid
        }
    }
}
</script>
