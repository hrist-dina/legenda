<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        loaded: false
    }),
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total']),
        ...mapState('favorite', ['favorites']),
        ...mapGetters('favorite', {
            cntFavorites: 'cnt'
        }),
        hasInCart() {
            return this.cnt > 0
        },
        classHasInCart() {
            return { 'has-count': this.hasInCart }
        },
        classHasFavorites() {
            return { 'has-count': this.cntFavorites > 0 }
        },
        setLoaded() {
            return { loaded: this.loaded }
        }
    },
    methods: {
        ...mapActions('products', {
            getItems: 'getItems'
        })
    },
    created() {
        // Запрос за детальными данными для корзины
        this.getItems({ ids: this.products.map(item => item.id) })
    },
    mounted() {
        this.loaded = true
    }
}
</script>
