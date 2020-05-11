<template lang="pug">
    .checkout__auth
        .checkout__title {{ title }}
        .form
            .field
                input-text(:required="true" name="login" placeholder="Логин" )
            .field
                input-text(:required="true" name="password" placeholder="Пароль" type="password")
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
