import HTTP, { urlAjax } from '%common%/http'

export default {
    add: async ({ getters, commit }, payload) => {
        if (getters.canAdd(payload)) {
            commit('startProcessing', payload)
            return await new HTTP(
                urlAjax.basketAdd,
                {
                    id: payload.id
                },
                () => {
                    if (!getters.isEqualCnt(payload)) {
                        commit('update', payload)
                    } else {
                        commit('add', payload)
                    }
                    commit('endProcessing', payload)
                }
            ).post()
        }
    },
    remove: async ({ getters, commit }, payload) => {
        if (getters.canRemove(payload)) {
            commit('startProcessing', payload)
            return await new HTTP(
                urlAjax.basketRemove,
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
        return await new HTTP(urlAjax.basketClean, null, () => {
            commit('clean')
        }).post()
    }
}
