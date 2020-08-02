<template lang="pug">
    .pagination(v-if="!!pages.length")
        router-link(
            v-for="page in pages"
            :key="page.name"
            :to="page.link"
            :class="{'current': isCurrent(page.name)}"
        ).pagination__item {{ page.name }}

</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        lastPage: {
            type: Number,
            required: true
        },
        routName: {
            type: String,
            required: true
        }
    },
    computed: {
        isCurrent: el => n => {
            return parseInt(el.currentPage) === n
        },
        pages() {
            let pages = []
            for (let i = 1; i <= this.lastPage; i++) {
                pages.push({
                    name: i,
                    link: {
                        name: this.routName,
                        params: { name: 'page', id: i }
                    }
                })
            }
            return pages
        }
    }
}
</script>
