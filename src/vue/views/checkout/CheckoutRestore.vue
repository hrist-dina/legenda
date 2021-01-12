<template lang="pug">
    .checkout-auth
        .checkout__title.checkout__title--auth Восстановить пароль
        .checkout__restore
            auth-restore(
                :redirect-to="authName"
            )
                template(#submit)
                    include ../../../blocks/components/ui-kit/ui-kit
                    +button('back')(@click.prevent="onBack").checkout-back Назад
</template>

<script>
import AuthRestore from '%vue%/views/auth/AuthRestore'
import { CHECKOUT_AUTH } from '%vue%/store/checkout/state'

export default {
    components: {
        AuthRestore
    },
    computed: {
        authName() {
            return CHECKOUT_AUTH
        }
    },
    methods: {
        onBack() {
            this.$router.push({ name: this.authName })
        }
    }
}
</script>

<!-- style in bem components checkout -->
