<template lang="pug">
    label.input-text(:class="classAction")
        span.input-text__placeholder {{ placeholder }}
        input(
            :type='getType'
            :name='name'
            :class='classInput'
            :value="value"
            @input='onInput'
            @focus="onFocus"
            @blur="onBlur"
            autocomplete="off"
        )
        span.input-text__eye-off(v-if="isPassword" @click.prevent="onShowPassword")
        transition(name='fade-in')
            span.input-text__error(v-if='hasError') {{ validate }}
            span.input-text__success(v-if='hasSuccess') {{ successValue }}
</template>

<script>
import { checkEmail, checkPhone } from '%common%/helper'
import { declOfNum } from '%common%/formatters'
import Mask from '%classes%/Mask'

export default {
    data() {
        return {
            showPassword: false,
            isActive: this.value !== '',
            isFocus: this.value !== '',
            isMaskComplete: false
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        validType: {
            type: String
        },
        isValidType: {
            type: Boolean
        },
        minLength: {
            type: Number
        },
        mask: {
            type: String
        },
        success: {
            type: Array,
            default: function () {
                return []
            }
        },
        validation: {
            type: Array,
            default: function () {
                let valArray = []
                if (this.required) {
                    valArray.push({
                        required: true,
                        message: 'Поле обязательное для заполнения!'
                    })
                }

                if (this.validType === 'email') {
                    valArray.push({
                        email: true,
                        valid: checkEmail,
                        message: 'Адрес содержит недопустимые символы'
                    })
                }

                if (this.validType === 'phone') {
                    valArray.push({
                        phone: true,
                        message: 'Номер телефона некорректный'
                    })
                }

                if (this.validType === 'password') {
                    valArray.push({
                        password: true,
                        message: 'Пароли не совпадают!'
                    })
                }

                if (this.minLength > 0) {
                    const text = declOfNum(this.minLength, [
                        'символ',
                        'символа',
                        'символов'
                    ])
                    valArray.push({
                        minLength: true,
                        message: `Длина не должна быть меньше ${this.minLength} ${text}!`
                    })
                }

                return valArray
            }
        }
    },
    computed: {
        getType() {
            if (this.isMaskPhone) {
                return 'tel'
            }
            if (this.isPassword) {
                return this.showPassword ? 'text' : 'password'
            }
            return this.type
        },
        isPassword() {
            return this.type === 'password'
        },
        classAction() {
            return {
                focus: this.isFocus,
                error: this.hasError,
                success: this.hasSuccess,
                password: this.isPassword,
                'show-password': this.showPassword
            }
        },
        classInput() {
            return { 'js-mask-phone': this.isMaskPhone }
        },
        isMaskPhone() {
            return this.mask === 'phone'
        },
        hasError() {
            return this.isActive && !this.isValid
        },
        hasSuccess() {
            return this.isActive && this.successValue.length
        },
        isValid() {
            return !this.validate.length
        },
        validate() {
            let error = ''
            this.validation.forEach(rule => {
                if (rule.required && this.value.length === 0) {
                    error = rule.message
                }
                if (
                    rule.email &&
                    this.value.length > 0 &&
                    rule.valid(this.value)
                ) {
                    error = rule.message
                }
                if (
                    rule.phone &&
                    this.value.length > 0 &&
                    !this.isMaskComplete
                ) {
                    error = rule.message
                }
                if (
                    rule.password &&
                    this.value.length > 0 &&
                    this.isValidType
                ) {
                    error = rule.message
                }

                if (rule.minLength && this.minLength > this.value.length) {
                    error = rule.message
                }

                if (rule.response && this.value.length !== 0) {
                    error = rule.message
                }
            })
            return error
        },
        successValue() {
            let message = ''
            this.success.forEach(rule => {
                if (!rule.required && this.value.length !== 0) {
                    message = rule.message
                }
                if (rule.response && this.value.length !== 0) {
                    message = rule.message
                }
            })
            return message
        }
    },
    methods: {
        onInput({ target }) {
            this.isActive = true
            this.$emit('input', {
                value: target.value.trim()
            })
        },
        onValidChange(valid) {
            if (this.isActive) {
                this.$emit('validate', { isValid: valid ?? this.isValid })
            }
        },
        onFocus() {
            this.isFocus = true
        },
        onBlur() {
            if (!this.value.length) {
                this.isFocus = false
            }
        },
        onShowPassword() {
            this.showPassword = !this.showPassword
        },
        initMask() {
            if (this.isMaskPhone) {
                this.isMaskComplete = true
                // При инициализации в цикле, не задаются events в inputmask, поэтому установлен setTimeout
                setTimeout(() => {
                    const mask = new Mask(
                        this.$el.querySelector('input')
                    ).phone({
                        oncomplete: () => {
                            this.isMaskComplete = true
                        },
                        oncleared: () => {
                            this.isMaskComplete = false
                        }
                    })

                    if (mask.isComplete()) {
                        this.isMaskComplete = true
                    }
                }, 100)
            }
        }
    },
    watch: {
        isValid() {
            this.onValidChange()
        },
        value() {
            if (this.isMaskComplete) {
                this.isMaskComplete = false
            }
        }
    },
    created() {
        if (this.isActive) {
            this.onValidChange()
        }
    },
    mounted() {
        this.initMask()
    }
}
</script>
