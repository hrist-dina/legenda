<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    .lk-tab
        section.lk-section
            article.lk-section__half
                .lk-section-body
                    .lk-section__title Доставка
                    .lk-write-off
                        delivery-form(
                            :is-new="true"
                            :show-delivery-type="false"
                            :show-title-and-city="false"
                            :show-date-time="true"
                        )
            article.lk-section__half
                .lk-section-order
                    lk-structure(
                        :is-limit="true"
                    )
</template>

<script>
import LkStructure from '%vue%/views/lk/LkStructure'
import DeliveryForm from '%vue%/components/DeliveryForm'

export default {
    name: 'lk-write-off',
    components: {
        DeliveryForm,
        LkStructure
    }
}
</script>

<!-- style in bem components lk -->
