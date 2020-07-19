<template lang="pug">
    .checkout-personal-data
        .checkout__thanks
            |Спасибо, что выбрали нас! При первом заказе Вам нужно один ввести необходимую информацию:
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
                    :mask="item.mask"
                    :valid-type="item.validType"
                )
            .checkout__button
                include ../../../blocks/components/ui-kit/ui-kit
                +button('default')(:disabled="!isValidForm") Далее
                checkout-back

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import InputText from '%vue%/components/InputText'
import CheckoutBack from '%vue%/views/checkout/CheckoutBack'

export default {
    components: {
        InputText,
        CheckoutBack
    },
    data() {
        return {
            title: '',
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
        }
    },
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapGetters('user', ['getPerson']),
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        isValidForm() {
            return !this.form.filter(el => !el.isValid).length
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName',
            onNext: 'next'
        }),
        ...mapActions('user', {
            register: 'register'
        }),
        onSubmit() {
            if (this.isValidForm) {
                this.register({
                    fio: this.form[this.getIndexByName('fio')].value,
                    email: this.form[this.getIndexByName('email')].value,
                    phone: this.form[this.getIndexByName('phone')].value
                }).then(response => {
                    if (response) {
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
    },
    created() {
        if (!this.title) {
            this.getDataByName(this.activeStep).then(data => {
                this.title = !!this.customTitle ? this.customTitle : data
            })
        }
        const person = this.getPerson
        for (let item in person) {
            if (person.hasOwnProperty(item)) {
                this.form[this.getIndexByName(item)].value = person[item]
            }
        }
    }
}
</script>

<!-- style in bem components checkout -->
