<template lang="pug">
.delivery-datetime
    .delivery-datetime__part
        app-date-picker(
            :date="date"
            @change="$emit('changeDate', $event)"
            placeholder="Желаемая дата"
        )
    .delivery-datetime__part
        app-time-picker(
            :time="time"
            @change="$emit('changeTime', $event)"
            placeholder="Время"
        )
</template>

<script>
import AppDatePicker from '%vue%/components/AppDatePicker'
import AppTimePicker from '%vue%/components/AppTimePicker'

export default {
    components: {
        AppDatePicker,
        AppTimePicker
    },
    props: {
        date: {
            type: null,
            required: true
        },
        time: {
            type: null,
            required: true
        }
    }
}
</script>

<!-- style in bem components delivery -->
