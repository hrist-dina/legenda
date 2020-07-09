<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    section.checkout-success
        +container
            .checkout-success__inner
                .checkout-success__title Заказ оформлен.
                    br
                    | Спасибо!
                .checkout-success__number Номер вашего заказа – {{ orderNumber }}
                .checkout-success__desc В
                    |
                    |
                    +link('личном кабинете','lk')
                    |
                    |вы можете отследить статус заказа, а также повторить его, если потребуется.
                .checkout-success__button
                    +button-link('На главную', '/', 'bordered')
</template>

<script>

import { toggleAdditionalProducts } from "%common%/helper"

export default {
    props: {
        number: {
            type: String
        }
    },
    computed: {
        orderNumber() {
            return this.number || this.$route.params.number
        }
    },
    created() {
        toggleAdditionalProducts(true)
    }
}
</script>

<!-- style in bem components checkout -->
