<template lang="pug">
    .checkout__welcome
        h3 Приветствуем
        p Впервые на сайте?
        .checkout__welcome-buttons
            button(type="button" @click.prevent="noLogin") Да
            button(type="button" @click.prevent="yesLogin") Нет
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
