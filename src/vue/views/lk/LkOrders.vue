<template lang="pug">
    include ../../../blocks/components/hint/hint
    include ../../../views/helpers/mixins
    .lk-tab
        .lk-orders(v-if="!!orders.length")
            .lk-orders__list
                lk-orders-item(
                    v-for="order in orders"
                    :key="order.id"
                    :order="order"
                )
            .lk-orders__pagination
                app-pagination(
                    :rout-name="routName"
                    :current-page="currentPage",
                    :last-page="lastPage"
                )
        .lk-orders-loading(v-else-if="isLoading")
            loader
        .lk-orders-empty(v-else)
            p У Вас пока нет заказов, перейдите, пожалуйста, в
                |
                |
                a(href="/catalog").link каталог

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LkOrdersItem from '%vue%/views/lk/LkOrdersItem'
import Loader from '%vue%/components/Loader'
import AppPagination from '%vue%/components/AppPagination'
import { LK_ORDERS } from '%vue%/router/lk'

export default {
    name: 'lk-orders',
    components: {
        LkOrdersItem,
        Loader,
        AppPagination
    },
    data: () => ({
        isLoading: false,
        routName: LK_ORDERS
    }),
    props: {
        currentPage: {
            type: Number,
            default: 1
        }
    },
    computed: {
        ...mapGetters('user', {
            getOrders: 'getOrders',
            getOrdersMeta: 'getOrdersMeta'
        }),
        orders() {
            return this.getOrders.slice(0, this.perPage)
        },
        lastPage() {
            return this.getOrdersMeta && this.getOrdersMeta.page
                ? this.getOrdersMeta.page['last-page'] || 0
                : 0
        },
        perPage() {
            return this.getOrdersMeta && this.getOrdersMeta.page
                ? this.getOrdersMeta.page['per-page'] || 2
                : 2
        }
    },
    methods: {
        ...mapActions('user', {
            fetchOrders: 'fetchOrders'
        }),
        updateOrders() {
            if (this.lastPage && this.currentPage > this.lastPage) {
                this.$router.push('/not-found')
            }
            this.isLoading = true
            this.fetchOrders({ page: this.currentPage }).then(() => {
                this.isLoading = false
            })
        }
    },
    created() {
        if (!this.orders.length) {
            this.updateOrders()
        }
    },
    watch: {
        currentPage() {
            this.updateOrders()
        }
    }
}
</script>

<!-- style in bem components lk -->
