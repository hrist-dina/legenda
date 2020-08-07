<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk
        +container
            .lk-header
                .lk-header__top
                    h1.lk-title Личный кабинет
                    +button-link('Выйти', false, 'bordered-md')(
                        v-if="isAuth"
                        @click.prevent="onLogout"
                    )
                lk-meta(
                    v-if="isAuth"
                    :bottle="person.bottle"
                    :bonus="person.bonus"
                    :balance="person.balance"
                ).lk-header__meta
                .lk-meta.lk-center-message(v-else)
                    | Доступно авторизованным пользователям, пожалуйста,
                    |
                    a(href="/auth").link зарегистрируйтесь
                    |
                    | или
                    |
                    a(href="/auth/#/login").link войдите
            .lk-body(v-if="isAuth")
                .lk-nav
                    router-link(
                        v-for="tab in tabNav"
                        :key="tab.name"
                        :to="{name: tab.name}"
                        active-class="active"
                        :class="{active: isActive(tab)}"
                    ).lk-nav__item {{ tab.title }}
                    +link-icon('Повторить последний заказ', 'repeat')(
                        @click.prevent="onRepeat"
                    ).link--repeat.lk-nav__repeat
                .lk-tabs
                    router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LkMeta from '%vue%/views/lk/LkMeta'
import { LK_ORDER_REPEAT, LK_ORDERS } from '%vue%/router/constants'
import { toggleAdditionalProducts } from '%common%/helper'
import { showNotification } from '%vue%/store/common/helper'

export default {
    components: {
        LkMeta
    },
    data: () => ({
        tabNav: null,
        baseRout: null
    }),
    computed: {
        ...mapGetters('user', {
            person: 'getPerson',
            isAuth: 'isAuth'
        }),
        isActive: el => data => {
            // Нужно чтобы определять вложенные элементы
            return el.$route.path.includes(data.path)
        }
    },
    methods: {
        ...mapActions('user', {
            logout: 'logout',
            getOrderLast: 'getOrderLast'
        }),
        onLogout() {
            this.logout().then(response => {
                if (response.status) {
                    window.location = '/'
                }
            })
        },
        toggleAdditional() {
            if (this.$route.name === LK_ORDERS) {
                toggleAdditionalProducts(false)
            } else {
                toggleAdditionalProducts()
            }
        },
        onRepeat() {
            this.getOrderLast().then(response => {
                const data = response.data
                if (response.status && data.order_id) {
                    this.$router.push({
                        name: LK_ORDER_REPEAT,
                        params: { number: data.order_id }
                    })
                } else {
                    showNotification(this.$store.commit)({
                        status: false,
                        error: 'Что-то пошло не так'
                    })
                }
            })
        }
    },
    created() {
        const baseRoute = this.$router.options.routes.filter(
            i => i.baseRoute
        )[0]

        if (baseRoute) {
            this.tabNav = baseRoute.children.map((i, n) => ({
                title: i.meta.tabTitle || `Таб №${n}`,
                name: i.meta.tabName || i.name,
                path: i.path
            }))
        } else {
            console.error('Not set routes for LK')
        }
        this.toggleAdditional()
    },
    watch: {
        $route() {
            this.toggleAdditional()
        }
    }
}
</script>

<!-- style in bem components lk -->
