<template lang="pug">
    include ../../../views/helpers/mixins
    ul.checkout-nav
        router-link(
            v-for="item in steps"
            :key="item.name"
            tag="li"
            :to="{name: item.name}"
            active-class="checkout-nav__item--active"
            :class="{'checkout-nav__item--done': isDone(item)}"
            exact
        ).checkout-nav__item
            .checkout-nav__inner
                .checkout-nav__head
                    a.checkout-nav__link
                        +icon.checkout-nav__icon(:class="`icon-${item.name}`")
                        span.checkout-nav__text {{ item.title }}
                .checkout-nav__body(v-if="isCurrent(item)")
                    slot(name="body")


</template>

<script>
export default {
    props: {
        steps: {
            type: Array,
            required: true
        }
    },
    computed: {
        isDone() {
            return item => {
                const steps = this.steps
                const current = steps.findIndex(
                    i => i.name === this.$route.name
                )
                return steps.slice(0, current).includes(item)
            }
        },
        isCurrent() {
            return item => {
                return item.name === this.$route.name
            }
        }
    }
}
</script>

<!-- style in bem components checkout -->
