<template lang="pug">
    include ../../../views/helpers/mixins
    .lk-address-item
        .lk-address-item__head
            .lk-address-item__type
                +icon(false)(
                    v-if="!!data.type"
                    :class="`icon-${data.type}`"
                ).lk-address-item__type-icon
                span.lk-address-item__type-name {{ data.title || 'Не указано' }}
        .lk-address-item__body
            .lk-address-item__data
                .lk-address-item__city {{ city }}
                .lk-address-item__value {{ data.address }}
            .lk-address-item__actions
                slot(name="actions")

</template>

<script>
export default {
    name: 'lk-address-item',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        city() {
            const city = this.data.city
            return city && city.name
                ? city.name
                : typeof city === 'string'
                ? city
                : 'Не указан'
        }
    }
}
</script>

<!-- style in bem components lk -->
