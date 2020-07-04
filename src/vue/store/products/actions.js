import HTTP, { urlAjax } from '%common%/http'

export default {
    getItems: async ({ commit }, payload) => {
        await new HTTP(urlAjax.products, { ids: payload.ids }, data => {
            commit('addItems', { items: data })
        }).get()
    }
}
