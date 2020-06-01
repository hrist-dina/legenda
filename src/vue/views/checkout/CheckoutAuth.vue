<template lang="pug">
    .checkout__auth
        .checkout__title {{ title }}
            include ../../../blocks/modules/ui-kit/ui-kit
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
            .form__button
                +button('Войти')(:disabled="!isValidForm")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import InputText from '%vue%/components/InputText'

export default {
    components: {
        InputText
    },
    data() {
        return {
            title: '',
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
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        isValidForm() {
            return !this.form.filter(el => !el.isValid).length
        }
    },
    methods: {
        ...mapActions('checkout', ['getDataByName']),
        onSubmit(e) {
            // TODO:: send to server
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
    }
}
</script>

<!-- style in bem components checkout -->
