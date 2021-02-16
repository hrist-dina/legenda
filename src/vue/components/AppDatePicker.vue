<template lang="pug">
    .datepicker
        date-picker(
            type="date"
            :placeholder="placeholder"
            :value="value"
            @change="onChange"
            format="DD.MM.YYYY"
            :disabled-date="disabledDate"
        )
        .datepicker__desc(v-if="hasDesc")
            slot(name="desc")
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'
import { formatDateToServer } from '%common%/formatters'
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
        },
        disabledBefore: {
            type: [Date, null],
            default: () => null
        },
        disabledAfter: {
            type: [Date, null],
            default: () => null
        },
        datesShow: {
            type: [Array, null],
            default: () => null
        }
    },
    computed: {
        hasDesc() {
            return !!this.$slots.desc
        },
        value() {
            return this.date ? new Date(this.date) : ''
        },
        disabledDate() {
            const before = this.disabledBefore
            const after = this.disabledAfter
            const datesShow = this.datesShow
            return function (date) {
                const start = date.setHours(0, 0, 0, 0)
                const end = date.setHours(23, 59, 59, 999)
                const isNotSame =
                    datesShow &&
                    datesShow.findIndex(
                        i => i.getTime() >= start && i.getTime() <= end
                    ) < 0

                if (isNotSame) {
                    return true
                }
                if (before && after) {
                    return date <= before || date >= after
                }
                if (before) {
                    return date <= before
                }
                if (after) {
                    return date >= after
                }
                return false
            }
        }
    },
    methods: {
        onChange(val) {
            this.$emit('change', formatDateToServer(val))
            this.$emit('validate', { isValid: !!val })
        }
    }
}
</script>
