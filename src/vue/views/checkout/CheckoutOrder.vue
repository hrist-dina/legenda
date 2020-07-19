<template lang="pug">
    .checkout-order
        .checkout-block-title Личные данные
        .checkout-block
            p {{ person.fio }}
            p {{ person.phone }}
            p {{ person.email }}




</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {},
    data() {
        return {
            title: '',
            form: []
        }
    },
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapGetters('user', ['getPerson']),
        ...mapState('checkout', ['hasLogin', 'activeStep']),
        person() {
            return this.getPerson
        }
    },
    methods: {
        ...mapActions('checkout', {
            getDataByName: 'getDataByName'
        })
    },
    created() {
        if (!this.title) {
            this.getDataByName(this.activeStep).then(data => {
                this.title = !!this.customTitle ? this.customTitle : data
            })
        }
    }
}
</script>

<!-- style in bem components checkout -->
