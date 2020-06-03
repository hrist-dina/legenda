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
            }
            return true
        } catch (error) {
            console.error(error)
        }
    }
}
