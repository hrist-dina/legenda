<template lang="pug">
    include ../../views/helpers/mixins
    .notification-list
        transition(
            name='modal'
            v-for="item in getNotifications"
            :key="item.time.timestamp"
        )
            .notification
                +icon('notification').notification__icon
                .notification__text {{ item.message }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'app-notification',
    computed: {
        ...mapGetters('common', ['getNotifications'])
    },
    methods: {
        ...mapActions('common', ['deleteNotification']),
        delete(val) {
            new Promise(resolve => setTimeout(resolve, 4000)).then(() => {
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
