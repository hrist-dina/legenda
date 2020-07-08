<template lang="pug">
    include ../../../views/helpers/mixins
    ul.checkout-nav
        router-link(
            tag="li"
            :to="{name: item.name}"
            exact
            v-for="item in steps.withoutLogin"
            :key="item.name"
            active-class="checkout-nav__item--active"
        ).checkout-nav__item
            a.checkout-nav__link
                +icon.checkout-nav__icon(:class="`icon-${item.name}`")
                span.checkout-nav__text {{ item.title }}

</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('checkout', ['steps'])
    }
}
</script>

<!-- style in bem components checkout -->
