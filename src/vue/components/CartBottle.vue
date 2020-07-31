<template lang="pug">
    include ../../views/helpers/mixins
    include ../../blocks/components/ui-kit/ui-kit
    .cart-bottle
        .cart-bottle__head
            .cart-bottle__title Нет бутыли на обмен?
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
                +button('in-cart', 'button')
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
