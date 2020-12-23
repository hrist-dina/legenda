<template lang="pug">
    include ../../blocks/components/ui-kit/ui-kit
    app-modal(:show-modal="isShowModal" @close="onClose")
        template(#header)
            h4 Сообщение
        .modal-message(v-html="message")
        template(#footer)
            +button('default')(
                @click.prevent="onClose"
            ) Ok

</template>

<script>
import { mapGetters } from 'vuex'
import AppModal from '%vue%/components/AppModal'

export default {
    name: 'app-modal-message',
    components: {
        AppModal
    },
    data: () => ({
        showModal: true
    }),
    computed: {
        ...mapGetters('user', {
            message: 'getMessage'
        }),
        isShowModal() {
            return this.message && this.showModal
        }
    },
    methods: {
        onClose() {
            this.showModal = !this.showModal
        }
    }
}
</script>
