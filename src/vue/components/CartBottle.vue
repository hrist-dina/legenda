<template lang="pug">
    include ../../views/helpers/mixins
    include ../../blocks/components/ui-kit/ui-kit
    include ../../blocks/components/hint/hint
    .cart-bottle
        .cart-bottle__head
            .cart-bottle__title Нет бутыли на обмен?
            +hint.cart-bottle__hint
                span Вы можете приобрести бутыль для обмена
        .cart-bottle__body
            +icon('bottle').cart-bottle__icon
            .cart-bottle__data
                span.cart-bottle__name Тара на замену 19л
                .cart-bottle__action
                    .cart-bottle__quantity
                        quantity-counter(
                            :quantity="1"
                        )
                    .cart-bottle__price {{ 200 | ruble }}
            .cart-bottle__buy
                +button('for-bottle', 'button')
                    +icon('product-cart')
                    span + К заказу


</template>

<script>
import QuantityCounter from '%vue%/components/QuantityCounter'

export default {
    components: {
        QuantityCounter
    }
}
</script>
