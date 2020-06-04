import axios from 'axios'

export default {
    register: async ({ commit }, payload) => {
        try {
            // TODO: change get to post
            const { data } = await axios.get('/mock/register.json', {
                fio: payload.fio,
                email: payload.email,
                phone: payload.phone
            })

            if (data.status) {
                commit('setToken', { token: data.data.token })
                commit('setPersonalData', payload)
                return true
            }
            return false
        } catch (error) {
            console.error(error)
        }
    },
    delivery: async ({ commit }, payload) => {
        console.log(payload)
        try {
            // TODO: change get to post
            const { data } = await axios.get('/mock/delivery.json', {
                address: payload.address,
                date: payload.date,
                time: payload.time
            })

            if (data.status) {
                commit('setDeliveryItem', payload)
                return true
            }
            return false
        } catch (error) {
            console.error(error)
        }
    }
}
