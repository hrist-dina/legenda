<template lang="pug">
    date-picker(
        type="time"
        :placeholder="placeholder"
        :value="time"
        @change="$emit('change', $event)"
        format="HH:mm"
    ).type-time
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
    name: 'app-time-picker',
    components: {
        DatePicker
    },
    props: {
        placeholder: {
            type: String,
            required: true
        },
        time: null
    }
}
</script>
