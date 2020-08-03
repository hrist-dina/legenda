<template lang="pug">
    .datepicker
        date-picker(
            type="date"
            :placeholder="placeholder"
            :value="value"
            @change="onChange"
            format="DD.MM.YYYY"
        )
        .datepicker__desc(v-if="hasDesc")
            slot(name="desc")
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'
export default {
    components: {
        DatePicker
    },
    props: {
        placeholder: {
            type: String,
            required: true
        },
        date: {
            type: null,
            required: true
        }
    },
    computed: {
        hasDesc() {
            return !!this.$slots.desc
        },
        value() {
            return this.date ? new Date(this.date) : ''
        }
    },
    methods: {
        onChange(val) {
            this.$emit('change', val)
            this.$emit('validate', { isValid: !!val })
        }
    }
}
</script>
