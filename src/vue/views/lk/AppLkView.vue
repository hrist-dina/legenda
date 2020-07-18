<template lang="pug">
    .lk
        .container
            .lk__header
                .lk__header-top
                    h1.lk__title Личный кабинет
                    a(href='javascript:void()' @click.prevent="onLogout") Выйти
                .lk__header-meta.lk__meta
                    .lk__meta-title Вам доступно <? hint>
                    .lk__meta-list
                        .lk__meta-item 4 бутылки
                        .lk__meta-item 500 бонусов
                        .lk__meta-item 75 Р остаток
            .lk__body
                .lk__tabs

</template>

<script>
import { mapActions } from 'vuex'

export default {
    computed: {},
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
