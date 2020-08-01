<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk
        +container
            .lk__header
                .lk__header-top
                    h1.lk__title Личный кабинет
                    +button-link('Выйти', false, 'bordered-md')(
                        @click.prevent="onLogout"
                    )
                lk-meta(
                    :bottle="person.bottle"
                    :bonus="person.bonus"
                    :balance="person.balance"
                ).lk__header-meta
            .lk__body
                .lk__tabs

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LkMeta from '%vue%/views/lk/LkMeta'

export default {
    components: {
        LkMeta
    },
    computed: {
        ...mapGetters('user', {
            person: 'getPerson'
        })
    },
    methods: {
        ...mapActions('user', {
            logout: 'logout'
        }),
        onLogout() {
            this.logout().then(response => {
                if (response.status) {
                    window.location = '/'
                }
            })
        }
    },
    created() {}
}
</script>

<!-- style in bem components lk -->
