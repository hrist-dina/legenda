<template lang="pug">
    date-picker(
        type="date"
        :placeholder="placeholder"
        :value="date"
        @change="$emit('change', $event)"
        format="DD.MM.YYYY"
    )
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
        date: null
    }
}
</script>
