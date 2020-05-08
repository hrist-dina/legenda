<script>
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cnt', 'total'])
    }
}
</script>
