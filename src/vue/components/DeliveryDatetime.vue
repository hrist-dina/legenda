<template lang="pug">
.delivery-datetime
    .delivery-datetime__part
        app-date-picker(
            :date="date"
            :disabled-before="disabledBeforeDate"
            :disabled-after="disabledAfterDate"
            :dates-show="datesDelivery"
            @change="onChangeDate"
            placeholder="Желаемая дата"
        )
    .delivery-datetime__part
        template(v-if="hasTimeOptions")
            v-select(
                placeholder="Время"
                @input="onChangeTime"
                :options="timeOptions"
                :value="time"
            )
                div(slot="no-options") Нет свободного

</template>

<script>
import AppDatePicker from '%vue%/components/AppDatePicker'

export default {
    components: {
        AppDatePicker
    },
    props: {
        date: {
            type: null,
            required: true
        },
        time: {
            type: null,
            required: true
        },
        disabledBeforeDate: {
            type: [Date, null],
            default: () => null
        },
        disabledAfterDate: {
            type: [Date, null],
            default: () => null
        },
        datesDelivery: {
            type: [Array, null],
            default: () => null
        },
        timeOptions: {
            type: Array,
            required: true
        }
    },
    computed: {
        hasTimeOptions() {
            return this.timeOptions && !!this.timeOptions.length
        }
    },
    methods: {
        onChangeDate(val) {
            this.$emit('changeDate', val)
        },
        onChangeTime(val) {
            this.$emit('changeTime', val.code)
        }
    }
}
</script>

<!-- style in bem components delivery -->
