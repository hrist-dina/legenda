import HTTP, { urlAjax } from '%common%/http'
import router from '%vue%/router/order'
import { CHECKOUT_SUCCESS } from '%vue%/store/checkout/state'

export default {
    register: async ({ commit }, payload) => {
        try {
            const response = await new HTTP(urlAjax.register, payload, data => {
                commit('setId', { id: data.id })
                commit('setToken', { token: data.token })
                commit('setPersonalData', payload)
            }).post()

            return response.data.status
        } catch (error) {
            console.error(error)
        }
    },
    delivery: async ({ commit }, payload) => {
        const response = await new HTTP(
            urlAjax.delivery,
            {
                address: payload.address,
                date: payload.date,
                time: payload.time
            },
            data => {
                commit('setDeliveryItem', payload)
            }
        ).post()

        return response.data.status
    },
    payment: async ({ state, rootState, dispatch }) => {
        const type = state.selectPaymentType
        const url =
            type === 'money' ? urlAjax.paymentMoney : urlAjax.paymentCard
        const response = await new HTTP(
            url,
            {
                userId: state.id,
                type,
                products: rootState.cart.products
            },
            data => {
                if (data.order) {
                    dispatch('cart/clean', null, { root: true }).then(() => {
                        router.push({
                            name: CHECKOUT_SUCCESS,
                            params: { number: data.order }
                        })
                    })
                }
                console.log(data)
            }
        ).post()

        return response.data.status
    },
    setPaymentType: ({ commit }, payload) => {
        commit('setSelectedPaymentType', payload)
    }
}
