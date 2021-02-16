import { mapActions } from 'vuex'

export const orderDateTimeOptions = {
    methods: {
        ...mapActions('user', {
            getOrderTime: 'orderTime',
            orderDate: 'orderDate'
        }),
        async getOptionsOrderTime(payload) {
            return await this.getOrderTime(payload).then(response => {
                if (response.status) {
                    return response.data.map(i => ({
                        code: i,
                        label: i
                    }))
                } else {
                    return []
                }
            })
        },
        async getOrderDate(payload) {
            return await this.orderDate(payload).then(response => {
                if (response.status) {
                    return response.data
                } else {
                    return []
                }
            })
        }
    }
}
