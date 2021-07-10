<template lang="pug">
    form.personal-data-form(@submit.prevent="onSubmit" ref="form")
        h4.personal-data-form__title(v-if="hasPassword") Личные данные
        .field(v-for="item in formFields")
            input-text(
                v-if="item.type !== 'date'"
                :key="item.name"
                :required="item.required"
                :name="item.name"
                :ref="item.name"
                :value="item.value"
                @input="onInput($event, item.name)"
                @validate="onValidate($event, item.name)"
                :placeholder="item.placeholder"
                :mask="item.mask"
                :valid-type="item.validType"
            )
            app-date-picker(
                v-else
                :key="item.name"
                :date="item.value"
                @change="onInput($event, item.name)"
                :placeholder="item.placeholder"

            ).datepicker--full
                template(#desc)
                     | * Укажите дату рождения, чтобы получать подарки

        h4.personal-data-form__title(v-if="hasPassword") Данные для входа в личный кабинет
        template(v-if="hasPassword")
            .field(v-for="item in formPassword")
                input-text(
                    :key="item.name"
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
                    template(#desc v-if="item.desc")
                        template {{ item.desc }}

        .personal-data-form__submit(v-if="hasSubmit")
            slot(name='submit')
</template>

<script>
import { mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
import AppDatePicker from '%vue%/components/AppDatePicker'
import { phoneReplaceForMask } from '%common%/formatters'
import { handlerTab } from '%common%/helper'

const emailField = {
    placeholder: 'Электронная почта',
    name: 'email',
    value: '',
    required: true,
    isValid: false,
    validType: 'email'
}

export default {
    components: {
        InputText,
        AppDatePicker
    },
    data: () => ({
        tabIndex: 0,
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
            { ...emailField },
            {
                placeholder: 'Дата рождения',
                name: 'birthDate',
                value: '',
                type: 'date',
                isValid: true
            }
        ],
        formPassword: [
            {
                ...emailField,
                desc:
                    '*Электронная почта будет Вашим логином при входе в личный кабинет.'
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
    props: {
        hasBirthDate: {
            type: Boolean,
            default: false
        },
        hasPhone: {
            type: Boolean,
            default: true
        },
        hasPassword: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('user', ['getPerson']),
        formFields() {
            return this.form.reduce((tot, i) => {
                if (i.name === 'email' && this.hasPassword) {
                    return tot
                } else if (i.name === 'birthDate' && !this.hasBirthDate) {
                    return tot
                } else if (i.name === 'phone' && !this.hasPhone) {
                    return tot
                } else {
                    tot.push(i)
                }
                return tot
            }, [])
        },
        isValidForm() {
            let form = this.form
            if (this.hasPassword) {
                form = [...form, ...this.formPassword]
            }
            return form.every(el => el.isValid)
        },
        hasSubmit() {
            return !!this.$slots.submit
        }
    },
    methods: {
        onSubmit() {
            if (this.isValidForm) {
                const data = {
                    fio: this.getField('fio').value,
                    email: this.getField('email').value
                }
                if (this.hasBirthDate) {
                    data.birthDate = this.getField('birthDate').value
                }
                if (this.hasPhone) {
                    data.phone = this.getField('phone').value
                }
                if (this.hasPassword) {
                    data.email = this.getField('email').value
                    data.password = this.getField('password').value
                    data.password_confirm = this.getField(
                        'password_confirm'
                    ).value
                }
                this.$emit('submit', data)
            }
        },
        getIndexByName(name, form = this.form) {
            return form.findIndex(el => el.name === name)
        },
        getField(name) {
            const index = this.getIndexByName(name)
            const indexFormPass = this.getIndexByName(name, this.formPassword)
            if (this.form[index]) {
                return this.form[index]
            } else if (this.formPassword[indexFormPass]) {
                return this.formPassword[indexFormPass]
            }
        },
        onInput(data, name) {
            let value = data || ''
            if (data && data.hasOwnProperty('value')) {
                value = data.value
            }
            const field = this.getField(name)
            field.value = value

            if (name === 'password_confirm') {
                this.onSamePassword()
            }
        },
        onValidate(data, name) {
            this.getField(name).isValid = data.isValid
        },
        onSamePassword() {
            const password = this.getField('password')
            const passwordConfirm = this.getField('password_confirm')

            if (password.value !== passwordConfirm.value) {
                password.isValidType = true
                passwordConfirm.isValidType = true
            } else {
                password.isValidType = false
                passwordConfirm.isValidType = false
            }
        }
    },
    created() {
        const person = this.getPerson
        for (let item in person) {
            if (person.hasOwnProperty(item)) {
                const fromItem = this.form[this.getIndexByName(item)]
                if (fromItem) {
                    let value = person[item]
                    if (item === 'phone') {
                        value = phoneReplaceForMask(value)
                        fromItem.isValid = !this.hasPhone
                    }
                    this.form[this.getIndexByName(item)].value = value
                }
            }
        }
        if (this.hasPassword) {
            const index = this.getIndexByName('email')
            this.form.splice(index, 1)
        }
    },
    mounted() {
        this.$refs.fio[0].$el.focus()
        handlerTab(this.$refs.form)
    },
    watch: {
        isValidForm: function () {
            this.$emit('isValid', this.isValidForm)
        }
    }
}
</script>

<!-- style in bem components delivery -->
