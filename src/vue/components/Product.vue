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
            cnt: 1
        }
    },
    computed: {
        ...mapGetters('cart', ['inProcessing'])
    },
    methods: {
        ...mapActions('cart', {
            addToCart: 'add'
        }),
        addToCartOne() {
            this.addToCart({ id: this.id, cnt: this.cnt })
        },
        onChangeQuantity(cnt) {
            this.cnt = cnt
        }
    },
    mounted() {
        this.id = this.$refs['product-button'].dataset.id
    }
}
</script>
