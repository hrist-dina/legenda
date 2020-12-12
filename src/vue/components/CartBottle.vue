<template lang="pug">
    include ../../views/helpers/mixins
    include ../../blocks/components/ui-kit/ui-kit
    include ../../blocks/components/hint/hint
    .cart-bottle(v-if="hasBottles")
        .cart-bottle__head
            .cart-bottle__title Нет бутыли на обмен?
            +hint.cart-bottle__hint
                span Вы можете приобрести бутыль для обмена
        .cart-bottle__list
            cart-bottle-item(
                v-for="item in list"
                :key="item.id"
                :init-id="item.id"
                :title="item.title"
                :price="item.price"
            )


</template>

<script>
import CartBottleItem from '%vue%/components/CartBottleItem'

export default {
    components: {
        CartBottleItem
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    computed: {
        hasBottles() {
            return !!this.list.length
        }
    }
}
</script>
