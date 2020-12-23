<template lang="pug">
    include ../../blocks/components/ui-kit/ui-kit
    app-modal(:show-modal="isSelectType" :show-cross="showCross")
        template(#header)
            h4 Чтобы продолжить выберите тип
        form(@submit.prevent="onSendSelectType")
            delivery-type-list(
                :delivery-types="deliveryTypes"
                @change-type="onChangeType"
            )
            .error-message(v-if="!!errorMessage" v-html="errorMessage")
            +button('default')(
                :disabled="isLoading"
                :class="{'is-loading': isLoading}"
            ) Сохранить

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppModal from '%vue%/components/AppModal'
import DeliveryTypeList from '%vue%/components/DeliveryTypeList'

export default {
    name: 'modal-select-type',
    components: {
        AppModal,
        DeliveryTypeList
    },
    data: () => ({
        errorMessage: null,
        isLoading: false
    }),
    props: {
        showModal: {
            type: Boolean,
            default: true
        },
        showCross: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('user', {
            isAuth: 'isAuth',
            hasSelectType: 'hasSelectType',
            deliveryTypes: 'getDeliveryTypes'
        }),
        isSelectType() {
            return this.hasSelectType && this.showModal && this.isAuth
        }
    },
    methods: {
        ...mapActions('user', {
            editSelectType: 'editSelectType'
        }),
        onChangeType(data) {
            this.type = data
            if (this.errorMessage) {
                this.errorMessage = null
            }
        },
        onSendSelectType() {
            this.isLoading = true
            this.editSelectType({
                type: this.type
            }).then(response => {
                this.isLoading = false
                if (response.status) {
                    location.reload()
                } else {
                    this.errorMessage = response.error
                }
            })
        }
    }
}
</script>
