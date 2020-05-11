<template lang="pug">
    .checkout__personal-data
        .checkout__title {{ title }}
        .form
            .field
                input-text(:required="true" name="fio" placeholder="Ф. И. О.")
            .field
                input-text(:required="true" name="phone" placeholder="Номер телефона")
            .field
                input-text(:required="true" name="email" placeholder="Электронная почта")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import InputText from '%vue%/components/InputText'

export default {
    components: {
        InputText
    },
    data() {
        return {
            title: ''
        }
    },
    props: {
        customTitle: {
            type: String
        }
    },
    computed: {
        ...mapState('checkout', ['hasLogin', 'activeStep'])
    },
    methods: {
        ...mapActions('checkout', ['getDataByName'])
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
