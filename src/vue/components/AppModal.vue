<template lang="pug">
    include ../../views/helpers/mixins
    transition(name='modal')
        .modal-mask(v-if="showModal" @click="onMask" ref='modal-mask')
            .modal-wrapper
                .modal-container
                    +icon('cross').modal-close(
                        v-if="showCross"
                        @click="$emit('close')"
                    )
                    .modal-header(v-if="hasHeader")
                        slot(name='header')
                    .modal-body(v-if="hasDefault")
                        slot
                    .modal-footer(v-if="hasFooter")
                        slot(name='footer')

</template>

<script>
export default {
    name: 'app-modal',
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        showCross: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        hasDefault() {
            return !!this.$slots.default
        },
        hasHeader() {
            return !!this.$slots.header
        },
        hasFooter() {
            return !!this.$slots.footer
        }
    },
    methods: {
        onMask({ target }) {
            if (this.$refs['modal-mask'] === target) {
                this.$emit('close')
            }
        }
    }
}
</script>
