<template lang="pug">
    .auth
        .container
            .auth__nav.swiper-container.js-tabs-scroll
                .swiper-wrapper
                    router-link(
                        v-for="tab in tabNav"
                        :key="tab.name"
                        :to="{name: tab.name}"
                        active-class="active"
                    ).swiper-slide.auth__nav-item
                        span.auth__nav-text {{ tab.title }}
            .auth__body
                router-view
</template>

<script>
export default {
    data: () => ({ tabNav: null }),
    created() {
        const baseRoute = this.$router.options.routes.filter(
            i => i.baseRoute
        )[0]

        if (baseRoute) {
            this.tabNav = baseRoute.children.reduce((tot, i) => {
                if (i.meta && i.meta.tabTitle) {
                    tot.push({
                        title: i.meta.tabTitle,
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
}
</script>
