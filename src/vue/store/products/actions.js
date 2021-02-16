import HTTP, { urlAjax } from '%common%/http'

export default {
    getItems: async ({ commit }, payload) => {
        commit('setIsLoading', true)
        await new HTTP(urlAjax.products, { ids: payload.ids }, data => {
            commit('addItems', { items: data })
            commit('setIsLoading', false)
        }).get()
    },
    getOrderItems: async ({ commit }, payload) => {
        commit('setIsLoading', true)
        await new HTTP(urlAjax.orderProducts, { ids: payload.ids }, data => {
            commit('addItemsOrder', { itemsOrder: data })
            commit('setIsLoading', false)
        }).get()
    }
}
