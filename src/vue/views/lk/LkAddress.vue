<template lang="pug">
    include ../../../blocks/components/ui-kit/ui-kit
    include ../../../views/helpers/mixins
    .lk__tab
        .lk-address
            .lk-address-list(v-if="!!addressList.length")
                lk-address-item(
                    v-for="(item, index) in addressList"
                    :key="item.id"
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
        modal-add-delivery(
            :showModal="showModalAddress"
            :delivery-form="deliveryFormPros"
            @close="showModalAddress = false"
        )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import LkAddressItem from '%vue%/views/lk/LkAddressItem'
import ModalAddDelivery from '%vue%/components/ModalAddDelivery'

export default {
    name: 'lk-address',
    components: {
        LkAddressItem,
        ModalAddDelivery
    },
    data: () => ({
        showModalAddress: false
    }),
    computed: {
        ...mapGetters('user', {
            addressList: 'getAddressList'
        }),
        deliveryFormPros: () => ({
            showTitleAndCity: true,
            showDateTime: false,
            showPhones: true
        })
    },
    methods: {
        ...mapMutations('user', ['setSelectedDelivery']),
        onEditAddress(e, index) {
            this.showModalAddress = !this.showModalAddress

            if (typeof index !== 'undefined' && this.addressList[index]) {
                this.setSelectedDelivery({
                    selectDelivery: this.addressList[index]
                })
            } else {
                this.setSelectedDelivery({
                    selectDelivery: null
                })
            }
        }
    }
}
</script>

<!-- style in bem components lk -->
