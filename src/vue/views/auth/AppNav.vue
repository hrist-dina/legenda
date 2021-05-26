<template lang="pug">
    .auth
        .container
            .auth__nav.swiper-container.js-tabs-scroll(v-if="tabNav && tabNav.length")
                .swiper-wrapper
                    router-link(
                        v-for="tab in tabNav"
                        :key="tab.name"
                        :to="{name: tab.name}"
                    ).swiper-slide.auth__nav-item.active
                        span.auth__nav-text {{ tab.title }}
            .auth__body
                router-view
</template>

<script>
export default {
    data: () => ({ tabNav: null }),
    computed: {
        getRouteName() {
            return this.$route.name
        }
    },
    watch: {
        getRouteName(route) {
            this.initTabNav()
        }
    },
    methods: {
        initTabNav() {
            const baseRoute = this.$router.options.routes.filter(
                i => i.baseRoute
            )[0]
            if (baseRoute) {
                this.tabNav = baseRoute.children.reduce((tot, i) => {
                    if (this.getRouteName === i.name) {
                        return tot
                    }
                    const tabTitle = i.meta && i.meta.tabTitle
                    if (tabTitle) {
                        tot.push({
                            title: tabTitle,
                            name: i.name,
                            path: i.path
                        })
                    }
                    return tot
                }, [])
            } else {
                console.error('Not set routes for Auth')
            }
        }
    },
    created() {
        this.initTabNav()
    }
}
</script>
