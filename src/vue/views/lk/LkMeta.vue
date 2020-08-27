<template lang="pug">
    include ../../../blocks/components/hint/hint
    include ../../../views/helpers/mixins
    .lk-meta
        .lk-meta__head
            .lk-meta__title Вам доступно
            +hint.hint--mobile-bottom.lk-meta__hint
                span Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, illo, sunt. Adipisci corporis cumque dolorem expedita fugit illum nemo nulla odio repudiandae! Incidunt libero quam similique ut! Laborum, quisquam totam.
        .lk-meta__list
            .lk-meta__item
                +icon('bottle').lk-meta__item-icon
                .lk-meta__item-data
                    .lk-meta__item-value {{ bottle }}
                    .lk-meta__item-title {{ bottle | bottleTitle }}
            .lk-meta__item
                +icon('bonus').lk-meta__item-icon
                .lk-meta__item-data
                    .lk-meta__item-value {{ bonus | thousand}}
                    .lk-meta__item-title {{ bonus | bonusTitle }}
            .lk-meta__item
                +icon('money').lk-meta__item-icon
                .lk-meta__item-data
                    .lk-meta__item-value {{ balance | ruble}}
                    .lk-meta__item-title остаток
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
