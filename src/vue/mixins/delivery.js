import { mapActions } from 'vuex'

export const orderTimeOptions = {
    methods: {
        ...mapActions('user', {
            getOrderTime: 'orderTime'
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
        }
    }
}
