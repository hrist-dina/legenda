<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['cart'])
    },
    methods: {
        ...mapActions('cart', {
            addToCart: 'add'
        }),
        addToCartOne({ target }) {
            this.addToCart({ id: target.dataset.id, cnt: 1 })
        }
    }
}
</script>
