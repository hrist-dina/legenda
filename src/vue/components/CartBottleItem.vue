<template lang="pug">
    include ../../views/helpers/mixins
    include ../../blocks/components/ui-kit/ui-kit
    .cart-bottle__item
        .cart-bottle__body
            +icon('bottle').cart-bottle__icon
            .cart-bottle__data
                span.cart-bottle__name {{ title }}
                .cart-bottle__action
                    .cart-bottle__quantity
                        quantity-counter(
                            @change-quantity="onChangeQuantity"
                            :quantity="cnt"
                        )
                    .cart-bottle__price {{ price | ruble }}
            .cart-bottle__buy
                +button('for-bottle', 'button')(
                    :class='classInCart'
                    @click='addToCart'
                    :disabled='isDisabled'
                    :data-id=id
                    data-in-cart-text='В заказе'
                    ref='product-button'
                )
                    +icon('product-cart')
                    span(ref='product-button-text') + К заказу

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QuantityCounter from '%vue%/components/QuantityCounter'
import UiKit from '%components%/ui-kit/ui-kit'

export default {
    components: {
        QuantityCounter
    },
    data: () => ({ id: '', cnt: 1, buttonEl: null }),
    props: {
        initId: {
            type: String,
            default: ''
        },
        title: {
            type: String
        },
        price: {
            type: Number
        }
    },
    computed: {
        ...mapGetters('cart', {
            inProcessing: 'inProcessing',
            inCart: 'inCart',
            dataById: 'dataById'
        }),
        isDisabled() {
            return this.inProcessing(this.id)
        },
        hasInCart() {
            return this.inCart({ id: this.id })
        },
        classInCart() {
            return { 'in-cart': this.hasInCart }
        }
    },
    methods: {
        ...mapActions('cart', {
            add: 'add'
        }),
        addToCart() {
            this.add({ id: this.id, cnt: this.cnt })
        },
        onChangeQuantity(cnt) {
            this.cnt = cnt
        },
        changeButtonText() {
            const inCartText = this.buttonEl.dataset.inCartText
            const textEl = this.$refs['product-button-text']
            const defaultText =
                this.buttonEl.dataset.defaultText || textEl.textContent
            if (this.hasInCart) {
                textEl.textContent = inCartText || 'В корзине'
                this.buttonEl.dataset.defaultText = defaultText
            } else {
                textEl.textContent = defaultText
            }
        }
    },
    mounted() {
        this.buttonEl = this.$refs['product-button']
        if (!this.buttonEl) return
        this.id = this.initId || this.buttonEl.dataset.id
        const data = this.dataById(this.id)
        if (data) {
            this.cnt = data.cnt
        }
        this.changeButtonText()
        new UiKit()
    },
    watch: {
        hasInCart: function () {
            this.changeButtonText()
        },
        cnt: function () {
            if (this.hasInCart) {
                this.add({ id: this.id, cnt: this.cnt })
            }
        }
    }
}
</script>
