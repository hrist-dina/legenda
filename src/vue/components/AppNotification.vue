<template lang="pug">
    include ../../views/helpers/mixins
    .notification-list
        transition(
            name='modal'
            v-for="item in getNotifications"
            :key="item.time.timestamp"
        )
            .notification(
                :class="{fixed: fixed(item)}"
            )
                .notification__inner
                    +icon('notification').notification__icon
                    .notification__text {{ item.message }}
                .notification__desc(v-if="fixed(item)" v-html="item.fixedMessage")
                .notification__close(v-if="fixed(item)" @click="deleteNotification(item)")
                    +icon('cross')

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { NOTIFICATION_SECONDS } from '%vue%/store/common/helper'

export default {
    name: 'app-notification',
    computed: {
        ...mapGetters('common', ['getNotifications']),
        fixed() {
            return item => !!item.fixedMessage
        }
    },
    methods: {
        ...mapActions('common', ['deleteNotification']),
        delete(val) {
            new Promise(resolve =>
                setTimeout(resolve, NOTIFICATION_SECONDS)
            ).then(() => {
                if (this.fixed(val)) {
                    return
                }
                this.deleteNotification(val)
            })
        }
    },
    watch: {
        getNotifications(data) {
            if (this.getNotifications.length && data[0]) {
                this.delete(data[0])
            }
        }
    }
}
</script>
