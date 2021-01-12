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
            .auth-form__message(v-if="message" v-html="message")
            .auth-form__error(v-if="error" v-html="error")
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
        message: null,
        error: null
    }),
    props: {
        redirectTo: {
            type: String,
            default: 'login'
        }
    },
    computed: {
        isValidForm() {
            return this.phone.isValid && !this.error
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
                        setTimeout(() => {
                            this.$router.push({ name: this.redirectTo })
                        }, 3000)
                    } else if (!response.status) {
                        this.error =
                            response.error ||
                            'Ошибка при восстановлении пароля!'
                    } else {
                        console.error(
                            'Unknown status from response restore form!'
                        )
                    }
                })
            }
        },
        onInput(data) {
            this.phone.value = data.value

            if (this.error) {
                this.error = null
            }
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
