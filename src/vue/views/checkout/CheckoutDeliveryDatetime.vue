<template lang="pug">
.checkout-delivery__datetime
    .checkout-delivery__datetime-part
        app-date-picker(
            :date="date"
            @change="$emit('changeDate', $event)"
            placeholder="Желаемая дата"
        )
    .checkout-delivery__datetime-part
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

<!-- style in bem components checkout -->
