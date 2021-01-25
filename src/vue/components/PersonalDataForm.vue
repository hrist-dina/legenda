<template lang="pug">
    form.personal-data-form(@submit.prevent="onSubmit")
        .field(v-for="item in formFields")
            input-text(
                v-if="item.type !== 'date'"
                :key="item.name"
                :required="item.required"
                :name="item.name"
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

        .personal-data-form__submit(v-if="hasSubmit")
            slot(name='submit')
</template>

<script>
import { mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
import AppDatePicker from '%vue%/components/AppDatePicker'
import { phoneReplaceForMask } from '%common%/formatters'

export default {
    components: {
        InputText,
        AppDatePicker
    },
    data: () => ({
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
                placeholder: 'Дата рождения',
                name: 'birthDate',
                value: '',
                type: 'date',
                isValid: true
            },
            {
                placeholder: 'Электронная почта',
                name: 'email',
                value: '',
                required: true,
                isValid: false,
                validType: 'email'
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
        }
    },
    computed: {
        ...mapGetters('user', ['getPerson']),
        formFields() {
            return this.form.reduce((tot, i) => {
                if (i.name === 'birthDate' && !this.hasBirthDate) {
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
            return !this.form.filter(el => !el.isValid).length
        },
        hasSubmit() {
            return !!this.$slots.submit
        }
    },
    methods: {
        onSubmit() {
            if (this.isValidForm) {
                const data = {
                    fio: this.form[this.getIndexByName('fio')].value,
                    email: this.form[this.getIndexByName('email')].value
                }
                if (this.hasBirthDate) {
                    data.birthDate = this.form[
                        this.getIndexByName('birthDate')
                    ].value
                }
                if (this.hasPhone) {
                    data.phone = this.form[this.getIndexByName('phone')].value
                }
                this.$emit('submit', data)
            }
        },
        getIndexByName(name) {
            return this.form.findIndex(el => el.name === name)
        },
        onInput(data, name) {
            let value = data || ''
            if (data && data.hasOwnProperty('value')) {
                value = data.value
            }
            this.form[this.getIndexByName(name)].value = value
        },
        onValidate(data, name) {
            this.form[this.getIndexByName(name)].isValid = data.isValid
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
    },
    watch: {
        isValidForm: function () {
            this.$emit('isValid', this.isValidForm)
        }
    }
}
</script>

<!-- style in bem components delivery -->
