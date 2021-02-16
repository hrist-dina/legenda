<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CartMini from '%vue%/components/CartMini'

export default {
    components: {
        CartMini
    },
    data: () => ({
        loaded: false
    }),
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total', 'productsDetailed']),
        ...mapState('favorite', ['favorites']),
        ...mapGetters('favorite', {
            cntFavorites: 'cnt'
        }),
        ...mapGetters('user', {
            isAuth: 'isAuth'
        }),
        ...mapState('products', ['isLoading']),
        hasInCart() {
            return this.cnt > 0
        },
        hasInFavorites() {
            return this.cntFavorites > 0
        },
        classHasInCart() {
            return { 'has-count': this.hasInCart }
        },
        classHasFavorites() {
            return { 'has-count': this.hasInFavorites }
        },
        setLoaded() {
            return { loaded: this.loaded }
        }
    },
    methods: {
        ...mapActions('products', {
            getOrderItems: 'getOrderItems'
        }),
        loadProducts() {
            if (this.products.length && !this.isLoading) {
                this.getOrderItems({ ids: this.products.map(item => item.id) })
            }
        }
    },
    created() {
        // Запрос за детальными данными для корзины
        this.loadProducts()
    },
    mounted() {
        this.loaded = true
    },
    watch: {
        products() {
            this.loadProducts()
        }
    }
}
</script>
