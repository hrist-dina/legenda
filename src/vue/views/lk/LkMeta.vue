<template lang="pug">
    include ../../../blocks/components/hint/hint
    include ../../../views/helpers/mixins
    .lk-meta
        .lk-meta__head
            .lk-meta__title Вам доступно
            +hint.hint--mobile-bottom.lk-meta__hint(v-if="hint")
                span(v-html="hint")
        .lk-meta__list
            .lk-meta__item
                +icon('bottle').lk-meta__item-icon
                .lk-meta__item-data
                    .lk-meta__item-value {{ bottle }}
                    .lk-meta__item-title {{ bottle | bottleTitle }}
            .lk-meta__item(v-if="hasBonus")
                +icon('bonus').lk-meta__item-icon
                .lk-meta__item-data
                    .lk-meta__item-value {{ bonus | thousand}}
                    .lk-meta__item-title {{ bonus | bonusTitle }}
            .lk-meta__item(v-if="hasBalance")
                +icon('money').lk-meta__item-icon
                .lk-meta__item-data
                    .lk-meta__item-value {{ balance | ruble}}
                    .lk-meta__item-title остаток
</template>

<script>
import { getStaticHtml } from '%common%/helper'

export default {
    name: 'lk-meta',
    props: {
        bottle: {
            type: Number,
            default: 0
        },
        bonus: {
            type: Number
        },
        balance: {
            type: Number
        }
    },
    data: () => ({
        hint: null
    }),
    computed: {
        hasBonus() {
            return this.bonus !== null
        },
        hasBalance() {
            return this.balance !== null
        }
    },
    created() {
        this.hint = getStaticHtml('static-lk-hint')
    }
}
</script>

<!-- style in bem components lk -->
