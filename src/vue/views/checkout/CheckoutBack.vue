<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    +button('back')(@click.prevent="onBack").checkout-back Назад
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('checkout', {
            onBack: 'back'
        })
    }
}
</script>

<!-- style in bem components checkout -->
