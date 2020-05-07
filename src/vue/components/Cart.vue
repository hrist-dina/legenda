<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total'])
    },
    methods: {
        ...mapActions('cart', {
            addToCart: 'add'
        }),
        addToCartOne({ target }) {
            console.log(this.$store)
            this.addToCart({ id: target.dataset.id, cnt: 1 })

            console.log(target)
        }
    }
}
</script>
