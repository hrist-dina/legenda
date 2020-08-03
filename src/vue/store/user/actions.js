import HTTP, { urlAjax } from '%common%/http'
import router from '%vue%/router/order'
import { CHECKOUT_SUCCESS } from '%vue%/store/checkout/state'

export default {
    register: async ({ commit }, payload) => {
        const response = await new HTTP(urlAjax.register, payload, data => {
            commit('setId', { id: data.id })
            commit('setToken', { token: data.token })
            commit('setPersonalData', payload)
        }).post()

        return response.data
    },
    editPersonalData: async ({ commit }, payload) => {
        const response = await new HTTP(
            urlAjax.editPersonalData,
            payload,
            () => {
                commit('setPersonalData', payload)
            }
        ).post()

        return response.data
    },
    login: async ({ commit }, payload) => {
        const response = await new HTTP(urlAjax.login, payload, data => {
            commit('setId', { id: data.id })
            commit('setToken', { token: data.token })
            commit('setPersonalData', data.person)
        }).post()

        return response.data
    },
    logout: async ({ commit, state }) => {
        const response = await new HTTP(
            urlAjax.logout,
            {
                token: state.token
            },
            () => {
                commit('setId', { id: null })
                commit('setToken', { token: null })
                commit('cleanPersonData')
            }
        ).post()

        return response.data
    },
    delivery: async ({ commit }, payload) => {
        const response = await new HTTP(
            urlAjax.delivery,
            {
                type: payload.type,
                address: payload.address,
                date: payload.date,
                time: payload.time
            },
            data => {
                commit('setDeliveryItem', payload)
                commit('setSelectedDelivery', { selectDelivery: payload })
            }
        ).post()

        return response.data
    },
    payment: async ({ state, rootState, dispatch }) => {
        const type = state.selectPaymentType.code
        const url =
            type === 'money' ? urlAjax.paymentMoney : urlAjax.paymentCard
        const response = await new HTTP(
            url,
            {
                userId: state.id,
                token: state.token,
                paymentType: type,
                delivery: state.selectDelivery,
                products: rootState.cart.products,
                isSpendBonus: state.isSpendBonus,
                isSpendBottle: state.isSpendBottle
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
            }
        ).post()

        return response.data.status
    },
    setPaymentType: ({ commit }, payload) => {
        commit('setSelectedPaymentType', { selectPaymentType: payload })
    },
    setDelivery: ({ commit }, payload) => {
        commit('setSelectedDelivery', { selectDelivery: payload })
    },
    setIsSpendBonus: ({ commit }, payload) => {
        commit('setIsSpendBonus', payload)
    },
    setIsSpendBottle: ({ commit }, payload) => {
        commit('setIsSpendBottle', payload)
    },
    fetchOrders: async ({ commit }, payload) => {
        const response = await new HTTP(urlAjax.lkOrders, payload)
            .get()
            .then(response => {
                if (response.data.status) {
                    commit('setOrders', response.data)
                }
                return response
            })

        return response.data
    }
}
