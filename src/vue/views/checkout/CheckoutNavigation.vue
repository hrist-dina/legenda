<template lang="pug">
    include ../../../views/helpers/mixins
    ul.checkout-nav
        router-link(
            :key="item.name"
            tag="li"
            :to="{name: item.name}"
            v-for="item in withoutLogin"
            active-class="checkout-nav__item--active"
            :class="{'checkout-nav__item--done': isDone(item)}"
            exact
        ).checkout-nav__item
            a.checkout-nav__link
                +icon.checkout-nav__icon(:class="`icon-${item.name}`")
                span.checkout-nav__text {{ item.title }}
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('checkout', ['steps']),
        withoutLogin() {
            return this.steps.withoutLogin
        },
        isDone() {
            return item => {
                const withoutLogin = this.withoutLogin
                const current = withoutLogin.findIndex(
                    i => i.name === this.$route.name
                )
                return withoutLogin.slice(0, current).includes(item)
            }
        }
    }
}
</script>

<!-- style in bem components checkout -->
