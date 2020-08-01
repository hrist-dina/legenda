<template lang="pug">
    form.personal-data-form(@submit.prevent="onSubmit")
        .field(v-for="item in form")
            input-text(
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
        .personal-data-form__submit(v-if="hasSubmit")
            slot(name='submit')
</template>

<script>
import { mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
import { phoneReplaceForMask } from '%common%/formatters'

export default {
    components: {
        InputText
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
                mask: 'phone'
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
    computed: {
        ...mapGetters('user', ['getPerson']),
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
                this.$emit('submit', {
                    fio: this.form[this.getIndexByName('fio')].value,
                    email: this.form[this.getIndexByName('email')].value,
                    phone: this.form[this.getIndexByName('phone')].value
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
                    }
                    fromItem.value = value
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
