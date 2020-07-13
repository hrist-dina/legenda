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
        this.id = this.buttonEl.dataset.id
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
