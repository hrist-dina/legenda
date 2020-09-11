<template lang="pug">
    include ../../blocks/components/ui-kit/ui-kit
    section.product-list-section
        .container
            .product-list(v-if="hasFavorite")
                product(
                    v-for="item in favoritesDetailed"
                    :key="item.id"
                    :initId="item.id"
                    :link="item.link"
                    :title="item.title"
                    :desc="item.desc"
                    :price="item.price"
                    :img="item.img"
                    :labels="item.labels"
                    :composition="item.composition"
                )
            .product-list-empty(v-else)
                .product-list-empty-message Товары не добавлены
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Product from '%vue%/components/Product'

export default {
    components: {
        Product
    },
    data: () => ({
        loaded: false
    }),
    computed: {
        ...mapState('favorite', ['favorites']),
        ...mapGetters('favorite', ['favoritesDetailed']),
        hasFavorite() {
            return !!this.favorites.length
        }
    },
    methods: {
        ...mapActions('products', {
            getItems: 'getItems'
        }),
        loadProducts() {
            if (this.hasFavorite) {
                this.getItems({ ids: this.favorites.map(i => i.id) })
            }
        }
    },
    created() {
        // Запрос за детальными данными товаров
        this.loadProducts()
    },
    mounted() {
        this.loaded = true
    },
    watch: {
        products() {
            this.loadProducts()
        }
    }
}
</script>

<!-- style in bem components favorite-page -->
