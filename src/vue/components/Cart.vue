<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total']),
        ...mapState('favorite', ['favorites']),
        ...mapGetters('favorite', {
            cntFavorites: 'cnt'
        })
    },
    methods: {
        ...mapActions('products', {
            getItems: 'getItems'
        })
    },
    created() {
        // Запрос за детальными данными для корзины
        this.getItems({ ids: this.products.map(item => item.id) })
    }
}
</script>
