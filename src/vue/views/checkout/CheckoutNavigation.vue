<template lang="pug">
    ul.checkout__nav
        router-link(
            tag="li"
            :to="{name: item.name}"
            exact
            v-for="item in steps.withoutLogin"
            :key="item.name"
            active-class="checkout__nav-item--active"
        ).checkout__nav-item
            a.checkout__nav-link {{ item.title }}

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
