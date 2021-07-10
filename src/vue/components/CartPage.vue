<template lang="pug">
include ../../blocks/components/ui-kit/ui-kit
include ../../views/helpers/mixins
.cart-page
    .container
        .cart-page__header
            .cart-page__header-left
                h2.cart-page__title Корзина
            .cart-page__header-center(v-if="warningMessages.length")
                .notification
                    +icon('notification').notification__icon
                    .notification__text
                        .notification__text-item(
                            v-for="(message, key) in warningMessages"
                            :key="key"
                        ) {{ message }}
            .cart-page__header-right
                a(
                    href='javascript:void(0)'
                    @click.prevent="cleanCart"
                    v-if="hasProducts"
                ).cart-page__clean Очистить корзину
        .cart-page__products
            template(v-if="showSkeleton")
                .cart-page__list
                    cart-item-skeleton(
                        v-for="product in products"
                        :key="product.id"
                    )
            template(v-else)
                .cart-page__list(v-if="hasProducts" )
                    cart-item(
                        v-for="product in productsDetailed"
                        :key="product.id"
                        :id="product.id"
                        :link="product.link"
                        :title="product.title"
                        :img="product.img"
                        :desc="product.desc"
                        :price="product.price"
                        :price-old="product.priceOld"
                        :quantity="product.cnt"
                    )
                .cart-page__empty(v-else)
                    p Корзина пуста! Перейдите в
                        |
                        |
                        a(href="/catalog/").link каталог
            .cart-page__footer(v-if="hasProducts")
                .cart-page__footer-left
                    cart-bottle(v-if="hasCartBottles" :list="cartBottles")
                .cart-page__footer-right
                    .cart-page__promocode
                        input-text(
                            :key="promocode.name"
                            :name="promocode.name"
                            :value="promocode.value"
                            @input="onInputPromocode($event)"
                            :placeholder="promocode.placeholder"
                            :validation="promocode.validation"
                            :success="promocode.success"
                        ).cart-page__promocode-input
                        +button('bordered-md', 'button')(
                            @click.prevent="onClickPromocodeSend"
                            :disabled="promocode.disabledButton"
                            :class="isSendPromocode"
                        ).cart-page__promocode-button Применить
                    .cart-page__order
                        .cart-page__total
                            .cart-page__total-title Итого:
                            .cart-page__total-value {{ total | ruble }}
                            .cart-page__total-sale(v-if="sale") Скидка {{ sale | ruble }}
                        .cart-page__to-order
                            router-link(:to="toOrder").link.link--big К оформлению заказа
    modal-select-type
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CartItem from '%vue%/components/CartItem'
import CartItemSkeleton from '%vue%/components/CartItemSkeleton'
import CartBottle from '%vue%/components/CartBottle'
import InputText from '%vue%/components/InputText'
import ModalSelectType from '%vue%/components/ModalSelectType'
import { toggleAdditionalProducts } from '%common%/helper'
import { CHECKOUT_FINAL, CHECKOUT_WELCOME } from '%vue%/store/checkout/state'

export default {
    components: {
        CartItem,
        CartBottle,
        CartItemSkeleton,
        InputText,
        ModalSelectType
    },
    data: () => ({
        promocode: {
            placeholder: 'Введите промокод, если есть',
            name: 'promocode',
            value: '',
            validation: [],
            success: [],
            disabledButton: true
        },
        isLoadData: false,
        sale: null
    }),
    computed: {
        ...mapState('cart', ['products']),
        ...mapState('products', {
            isLoadingProducts: 'isLoading'
        }),
        ...mapGetters('cart', [
            'cnt',
            'total',
            'productsDetailed',
            'isLoading',
            'warningMessages',
            'cartBottles'
        ]),
        ...mapGetters('user', ['isAuth']),
        hasProducts() {
            return !!this.productsDetailed.length
        },
        toOrder() {
            return this.isAuth
                ? { name: CHECKOUT_FINAL }
                : { name: CHECKOUT_WELCOME }
        },
        isSendPromocode() {
            return { 'is-loading': this.isLoading }
        },
        showSkeleton() {
            return (
                !this.isLoadData && (this.isLoadingProducts || this.isLoading)
            )
        },
        hasCartBottles() {
            return !!this.cartBottles.length
        }
    },
    methods: {
        ...mapActions('cart', {
            cleanCart: 'clean',
            sendPromocode: 'promocode'
        }),
        onInputPromocode({ value }) {
            this.promocode.value = value
            if (value.length === 0) {
                this.promocode.disabledButton = true
                this.promocode.validation = []
            } else {
                this.promocode.disabledButton = false
            }
        },
        onClickPromocodeSend() {
            if (!this.promocode.value.length) {
                return
            }
            this.sendPromocode({
                promocode: this.promocode.value
            }).then(response => {
                const data = response.data
                if (data.status) {
                    this.sale = data.data.sale
                    this.promocode.success = [
                        {
                            response: true,
                            message: data.data.message
                        }
                    ]
                } else {
                    this.promocode.validation = [
                        {
                            response: true,
                            message: data.error
                        }
                    ]
                }
            })
        }
    },
    created() {
        toggleAdditionalProducts(false)
    },
    watch: {
        isLoadingProducts() {
            if (!this.isLoadData) {
                this.isLoadData = true
            }
        }
    }
}
</script>

<!-- style in bem components cart-page -->
