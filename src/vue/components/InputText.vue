<template lang="pug">
    label.input-text
        //- span.input-text__label
        input(
            :type='type'
            :name='name'
            :placeholder='placeholder'
            :value='value'
            @input='onInput'
        )
        span.input-text__error(v-if='hasError') {{ validate }}
</template>

<script>
export default {
    data() {
        return {
            isActive: this.value !== ''
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
        validation: {
            type: Array,
            default: function () {
                return this.required
                    ? [
                          {
                              required: true,
                              message: 'Поле обязательное для заполнения!'
                          }
                      ]
                    : []
            }
        }
    },
    computed: {
        hasError() {
            return this.isActive && !this.isValid
        },
        isValid() {
            console.log(this.validate)
            return !this.validate.length
        },
        validate() {
            let error = ''
            this.validation.forEach(rule => {
                if (rule.required && this.value.length === 0) {
                    error = rule.message
                }
            })
            return error
        }
    },
    methods: {
        onInput({ target }) {
            this.isActive = true
            this.$emit('input', {
                value: target.value.trim()
            })
        },
        onValidChange() {
            if (this.isActive) {
                this.$emit('validate', { isValid: this.isValid })
            }
        }
    },
    watch: {
        isValid() {
            this.onValidChange()
        }
    },
    created() {
        if (this.isActive) {
            this.onValidChange()
        }
    }
}
</script>
