<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .auth-form.auth-form--restore
        form(@submit.prevent="onSubmit")
            .field
                input-text(
                    :mask="phone.mask"
                    :required="phone.required"
                    :name="phone.name"
                    :type="phone.type"
                    :value="phone.value"
                    @input="onInput($event)"
                    @validate="onValidate($event)"
                    :placeholder="phone.placeholder"
                    :valid-type="phone.validType"
                )
            .auth-form__message(v-if="message") {{ message }}
            .auth-form__button
                +button('default')(:disabled="!isValidForm") Отправить

</template>

<script>
import InputText from '%vue%/components/InputText'
import { mapActions } from 'vuex'
import TabsScroll from '%classes%/TabsScroll'

export default {
    components: {
        InputText
    },
    data: () => ({
        phone: {
            placeholder: 'Номер телефона',
            name: 'phone',
            value: '',
            required: true,
            isValid: false,
            mask: 'phone',
            validType: 'phone'
        },
        message: ''
    }),
    computed: {
        isValidForm() {
            return this.phone.isValid
        }
    },
    methods: {
        ...mapActions('user', {
            restore: 'restore'
        }),
        onSubmit() {
            if (this.isValidForm) {
                this.restore({
                    phone: this.phone.value
                }).then(response => {
                    if (response.status) {
                        this.message = response.data.message
                    }
                })
            }
        },
        onInput(data) {
            this.phone.value = data.value
        },
        onValidate(data) {
            this.phone.isValid = data.isValid
        }
    },
    mounted() {
        new TabsScroll()
    }
}
</script>
