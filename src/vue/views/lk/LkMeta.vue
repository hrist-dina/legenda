<template lang="pug">
    include ../../../blocks/components/hint/hint
    include ../../../views/helpers/mixins
    .lk__meta
        .lk__meta-head
            .lk__meta-title Вам доступно
            +hint.lk__meta-hint
                span Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, illo, sunt. Adipisci corporis cumque dolorem expedita fugit illum nemo nulla odio repudiandae! Incidunt libero quam similique ut! Laborum, quisquam totam.
        .lk__meta-list
            .lk__meta-item
                +icon('bottle').lk__meta-item-icon
                .lk__meta-item-data
                    .lk__meta-item-value {{ bottle }}
                    .lk__meta-item-title {{ bottle | bottleTitle }}
            .lk__meta-item
                +icon('bonus').lk__meta-item-icon
                .lk__meta-item-data
                    .lk__meta-item-value {{ bonus | thousand}}
                    .lk__meta-item-title {{ bonus | bonusTitle }}
            .lk__meta-item
                +icon('money').lk__meta-item-icon
                .lk__meta-item-data
                    .lk__meta-item-value {{ balance | ruble}}
                    .lk__meta-item-title остаток
</template>

<script>
export default {
    name: 'lk-meta',
    props: {
        bottle: {
            type: Number,
            default: 0
        },
        bonus: {
            type: Number,
            default: 0
        },
        balance: {
            type: Number,
            default: 0
        }
    }
}
</script>

<!-- style in bem components lk -->
