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
        ...mapGetters('cart', ['inProcessing', 'dataById'])
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
        }
    },
    mounted() {
        this.id = this.$refs['product-button'].dataset.id
        const data = this.dataById(this.id)
        if (data) {
            this.cnt = data.cnt
        }
    }
}
</script>
