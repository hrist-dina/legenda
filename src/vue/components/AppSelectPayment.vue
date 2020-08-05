<template lang="pug">
    v-select(
        :placeholder="placeholder"
        @input="$emit('change', $event)"
        :options="options"
        :value="value"
    )
        div(slot="no-options") Не найден способ оплаты
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Выберите способ оплаты'
        },
        options: {
            type: Array, // [{code:'', label: ''}]
            required: true
        },
        value: {
            type: null,
            required: true
        }
    }
}
</script>
