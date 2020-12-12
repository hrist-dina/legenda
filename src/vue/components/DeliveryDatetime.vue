<template lang="pug">
.delivery-datetime
    .delivery-datetime__part
        app-date-picker(
            :date="date"
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
import { mapActions } from 'vuex'

export default {
    components: {
        AppDatePicker
    },
    data: () => ({
        timeOptions: null
    }),
    props: {
        date: {
            type: null,
            required: true
        },
        time: {
            type: null,
            required: true
        }
    },
    computed: {
        hasTimeOptions() {
            return this.timeOptions && !!this.timeOptions.length
        }
    },
    methods: {
        ...mapActions('user', {
            getOrderTime: 'orderTime'
        }),
        onChangeDate(val) {
            this.$emit('changeDate', val)
            this.getOrderTime({
                date: val
            }).then(response => {
                if (response.status) {
                    this.timeOptions = response.data.map(i => ({
                        code: i,
                        label: i
                    }))
                }
            })
        },
        onChangeTime(val) {
            this.$emit('changeTime', val.code)
        }
    }
}
</script>

<!-- style in bem components delivery -->
