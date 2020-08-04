<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk__tab
        .lk-address
            .lk-address-list(v-if="!!addressList.length")
                lk-address-item(
                    v-for="(item, index) in addressList"
                    :key="index"
                    :data="item"
                )
                    template(#actions)
                        +link('Изменить', false, 'bordered')(
                            @click.prevent="onEditAddress($event, index)"
                        )
            .lk-center-message(v-else)
                | Список адресов пуст
            .lk-address-add
                +button('default')(
                    @click.prevent="onEditAddress"
                ) Добавить адрес
        app-modal(:showModal="showModalAddress" @close="showModalAddress = false")
            template(#header)
                h3 Новый адрес
            delivery-form(
                :show-title-and-city="true"
                :show-date-time="false"
                @submit="onSubmitModalAddress"
                @isValid="onValidModalAddress"
            )
                template(#submit)
                    .error-message(v-if="!!errorMessage") {{ errorMessage }}
                    +button('default')(
                        :disabled="!isValidModalAddress || isSubmittingModalAddress"
                        :class="{'is-loading': isSubmittingModalAddress}"
                    ) Сохранить
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import LkAddressItem from '%vue%/views/lk/LkAddressItem'
import AppModal from '%vue%/components/AppModal'
import DeliveryForm from '%vue%/components/DeliveryForm'

export default {
    name: 'lk-address',
    components: {
        LkAddressItem,
        AppModal,
        DeliveryForm
    },
    data: () => ({
        errorMessage: '',
        showModalAddress: false,
        isValidModalAddress: false,
        isSubmittingModalAddress: false
    }),
    computed: {
        ...mapGetters('user', {
            addressList: 'getDeliveryItems'
        })
    },
    methods: {
        ...mapActions('user', {
            handleDelivery: 'delivery'
        }),
        ...mapMutations('user', ['setSelectedDelivery']),
        onEditAddress(e, index) {
            this.showModalAddress = !this.showModalAddress

            if (typeof index !== 'undefined' && this.addressList[index]) {
                this.setSelectedDelivery({
                    selectDelivery: this.addressList[index]
                })
            }
        },
        onValidModalAddress(value) {
            this.isValidModalAddress = value
        },
        onSubmitModalAddress(value) {
            if (this.isValidModalAddress) {
                this.isSubmittingModalAddress = true
                this.handleDelivery(value)
                    .then(response => {
                        if (response) {
                            this.showModalAddress = false
                            this.errorMessage = ''
                        } else {
                            this.errorMessage = response.error
                        }
                        this.isSubmittingModalAddress = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isSubmittingModalAddress = false
                    })
            }
        }
    }
}
</script>

<!-- style in bem components lk -->
