<template lang="pug">
    include ../../views/helpers/mixins
    include ../../blocks/components/ui-kit/ui-kit
    //- Дублирование шаблона в src/blocks/components/product/product.pug (переиспользовать не удалось)
    article.product
        .product__inner.test
            .product__top
                .product__favorite
                    +icon('favorite').product__favorite-icon(
                        @click.prevent="toggleToFavorite"
                        :class="classInFavorite"
                    )
                .product__right
                    template(v-if=labels)
                        .product__label.product-label
                            .product-label__item(
                                v-for="item in labels"
                                :class="item.type || 'hit'"
                            ) {{ item.name }}
                    template(v-if=composition)
                        .product__composition.product-composition
                            .product-composition__item(
                                v-for="item in composition"
                            ) {{ item }}
            a(:href="link").product__img-link
                img(
                    :src="img"
                    :alt="title"
                    :title="title"
                ).product__img
            .product__data
                a(:href="link").product__title {{ title }}
                .product__desc {{ desc }}
            .product__actions
                .product__price {{ price | ruble }}
                +button('in-cart', 'button')(
                    :class='classInCart'
                    @click='addToCart'
                    :disabled='isDisabled'
                    :data-id=id
                    data-in-cart-text='В корзине'
                    ref='product-button'
                )
                    +icon('product-cart')
                    span(ref='product-button-text')
                        | В корзину
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QuantityCounter from '%vue%/components/QuantityCounter'

export default {
    components: {
        QuantityCounter
    },
    data() {
        return {
            id: '',
            cnt: 1,
            buttonEl: null
        }
    },
    props: {
        initId: {
            type: String,
            default: ''
        },
        link: {
            type: String
        },
        title: {
            type: String
        },
        desc: {
            type: String
        },
        price: {
            type: Number
        },
        img: {
            type: String
        },
        labels: {
            type: Array
        },
        composition: {
            type: Array
        }
    },
    computed: {
        ...mapGetters('cart', {
            inProcessing: 'inProcessing',
            inCart: 'inCart',
            dataById: 'dataById'
        }),
        ...mapGetters('favorite', {
            inProcessingFavorite: 'inProcessingFavorite',
            inFavorite: 'inFavorite'
        }),
        isDisabled() {
            return this.inProcessing(this.id)
        },
        hasInCart() {
            return this.inCart({ id: this.id })
        },
        classInCart() {
            return { 'in-cart': this.hasInCart }
        },
        isDisabledFavorite() {
            return this.inProcessingFavorite(this.id)
        },
        hasInFavorite() {
            return this.inFavorite({ id: this.id })
        },
        classInFavorite() {
            return {
                'in-favorite': this.hasInFavorite,
                disabled: this.isDisabledFavorite
            }
        }
    },
    methods: {
        ...mapActions('cart', {
            add: 'add'
        }),
        ...mapActions('favorite', {
            addFavorite: 'add',
            removeFavorite: 'remove'
        }),
        addToCart() {
            this.add({ id: this.id, cnt: this.cnt })
        },
        onChangeQuantity(cnt) {
            this.cnt = cnt
        },
        changeButtonText() {
            const inCartText = this.buttonEl.dataset.inCartText
            if (this.hasInCart) {
                const textEl = this.$refs['product-button-text']
                textEl.textContent = inCartText || 'В корзине'
            }
        },
        toggleToFavorite() {
            this.hasInFavorite
                ? this.removeFavorite({ id: this.id })
                : this.addFavorite({ id: this.id })
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
