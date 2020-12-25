import HTTP, { urlAjax } from '%common%/http'
import router from '%vue%/router/order'
import { CHECKOUT_SUCCESS } from '%vue%/store/checkout/state'
import { showNotification } from '%vue%/store/common/helper'

export default {
    register: async ({ commit, rootGetters }, payload) => {
        const response = await new HTTP(
            urlAjax.register,
            {
                ...payload,
                wish: rootGetters['favorite/idsArray']
            },
            data => {
                commit('setId', { id: data.id })
                commit('setToken', { token: data.token })
                commit('setPersonalData', payload)
            }
        ).post()

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
    editSelectType: async ({ commit }, payload) => {
        const response = await new HTTP(
            urlAjax.userType,
            { delivery_type: payload.type },
            () => {
                commit('setType', payload)
                commit('setSelectType', { selectType: false })
            }
        ).post()

        return response.data
    },
    login: async ({ commit, rootGetters }, payload) => {
        const response = await new HTTP(
            urlAjax.login,
            {
                ...payload,
                wish: rootGetters['favorite/idsArray']
            },
            data => {
                commit('setId', { id: data.id })
                commit('setToken', { token: data.token })
                commit('setPersonalData', data.person)
            }
        ).post()

        if (response.data.wish) {
            commit('favorite/concat', response.data.wish, { root: true })
        }

        return response.data
    },
    restore: async ({ commit }, payload) => {
        const response = await new HTTP(urlAjax.restore, payload).post()

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
                commit('cleanDeliveryItems')
            }
        ).post()

        return response.data
    },
    delivery: async ({ commit }, payload) => {
        const response = await new HTTP(urlAjax.delivery, payload, data => {
            commit('setDeliveryItem', data)
            commit('setSelectedDelivery', { selectDelivery: payload })
        }).post()

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
                console.log(data)

                if (data.order) {
                    dispatch('cart/clean', null, { root: true }).then(() => {
                        const path = router.resolve({
                            name: CHECKOUT_SUCCESS,
                            params: { number: data.order }
                        })
                        // Делаем так, чтобы можно было сделать редирект из разных типов route (order, lk)
                        window.location = path.href
                    })
                }

                if (data.url) {
                    // Делаем редирект на онлайн оплату
                    window.location = data.url
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
    },
    getOrderLast: async ({ commit }, payload) => {
        const response = await new HTTP(
            urlAjax.lkOrdersLast,
            payload,
            () => {},
            showNotification(commit)
        ).post()

        return response.data
    },
    orderRepeat: async ({ commit }, payload) => {
        const response = await new HTTP(
            urlAjax.lkOrdersRepeat,
            payload,
            data => {
                commit('cart/addMany', data.cart, { root: true })
                commit('setDeliveryItem', data.delivery)
                commit('setSelectedDelivery', { selectDelivery: data.delivery })
            },
            showNotification(commit)
        ).get()

        return response.data
    },
    orderTime: async ({ commit, getters }, payload) => {
        const response = await new HTTP(
            urlAjax.orderTime,
            {
                ...payload,
                delivery: getters.getSelectDelivery
            },
            false,
            showNotification(commit)
        ).get()

        return response.data
    },
    orderBonus: async ({ commit }) => {
        const response = await new HTTP(
            urlAjax.orderBonus,
            false,
            data => {
                commit('setPersonalData', { bonus: data.bonus })
            },
            showNotification(commit)
        ).get()

        return response.data
    },
    deliveryLk({ commit }, payload) {
        // TODO:: как будет api
    }
}
