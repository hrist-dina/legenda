<template lang="pug">
    v-select(
        placeholder="Выберите способ оплаты"
        @input="$emit('change', $event)"
        :options="options"
        :value="value"
    )
        div(slot="no-options") Не найден способ оплаты
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        value: {
            type: null,
            required: true
        }
    }
}
</script>
