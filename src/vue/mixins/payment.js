import AppSelectPayment from '%vue%/components/AppSelectPayment'
import { mapActions, mapGetters, mapState } from 'vuex'

export const selectPayment = {
    components: {
        AppSelectPayment
    },
    computed: {
        ...mapState('user', ['selectPaymentType']),
        ...mapGetters('user', ['getPayment'])
    },
    methods: {
        ...mapActions('user', {
            setPaymentType: 'setPaymentType'
        }),
        setType(val) {
            this.setPaymentType(val)
        },
        onChange(val) {
            this.setType(val)
        }
    }
}
