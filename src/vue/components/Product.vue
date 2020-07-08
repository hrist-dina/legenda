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
        ...mapGetters('cart', ['inProcessing', 'inCart', 'dataById']),
        isDisabled() {
            return this.inProcessing(this.id)
        },
        hasInCart() {
            return this.inCart({ id: this.id })
        },
        classInCart() {
            return this.hasInCart ? 'in-cart' : ''
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
            if (this.hasInCart) {
                const textEl = this.$refs['product-button-text']
                textEl.textContent = inCartText || 'В корзине'
            }
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
