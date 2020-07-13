import HTTP, { urlAjax } from '%common%/http'

export default {
    add: async ({ getters, commit }, payload) => {
        if (getters.canAddFavorite(payload)) {
            commit('startProcessing', payload)
            return await new HTTP(
                urlAjax.favoriteAdd,
                {
                    id: payload.id
                },
                () => {
                    commit('add', payload)
                    commit('endProcessing', payload)
                }
            ).post()
        }
    },
    remove: async ({ getters, commit }, payload) => {
        if (getters.canRemoveFavorite(payload)) {
            commit('startProcessing', payload)
            return await new HTTP(
                urlAjax.favoriteRemove,
                {
                    id: payload.id
                },
                () => {
                    commit('remove', payload)
                    commit('endProcessing', payload)
                }
            ).post()
        }
    },
    clean: async ({ commit }) => {
        return await new HTTP(urlAjax.favoriteRemove, null, () => {
            commit('clean')
        }).post()
    }
}
