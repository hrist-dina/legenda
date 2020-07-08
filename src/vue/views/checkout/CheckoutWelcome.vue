<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .checkout__welcome
        h3.checkout-subtitle Приветствуем
        p.checkout-desc Впервые на сайте?
        .checkout__welcome-buttons
            +button('bordered')(@click.prevent="noLogin") Да
            +button('bordered')(@click.prevent="yesLogin") Нет, войти
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('checkout', {
            setHasLogin: 'setHasLogin'
        }),
        yesLogin() {
            this.setHasLogin({ hasLogin: true })
        },
        noLogin() {
            this.setHasLogin({ hasLogin: false })
        }
    }
}
</script>

<!-- style in bem components checkout -->
