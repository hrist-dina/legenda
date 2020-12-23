import HTTP, { urlAjax } from '%common%/http'
import { showNotification } from '%vue%/store/common/helper'

export default {
    add: async ({ getters, commit }, payload) => {
        if (getters.canAdd(payload)) {
            commit('startProcessing', payload)
            return await new HTTP(
                urlAjax.basketAdd,
                {
                    id: payload.id,
                    qnt: payload.cnt || 1
                },
                () => {
                    if (!getters.isEqualCnt(payload)) {
                        commit('update', payload)
                    } else {
                        commit('add', payload)
                    }
                    commit('endProcessing', payload)
                },
                showNotification(commit)
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
    },
    promocode: async ({ getters, commit }, payload) => {
        if (!!getters.cnt && !getters.isLoading) {
            commit('setIsLoading', true)
            return await new HTTP(
                urlAjax.basketPromocode,
                {
                    promocode: payload.promocode
                },
                data => {
                    commit('setIsLoading', false)
                    commit(
                        'addMany',
                        data.cart.map(i => ({ ...i, cnt: i.cnt || 1 }))
                    )
                }
            )
                .post()
                .then(response => {
                    commit('setIsLoading', false)
                    return response
                })
        }
    },
    updateBottle({ commit }, payload) {
        commit('updateBottle', payload)
    },
    removeBottle({ commit }, payload) {
        commit('removeBottle', payload)
    },
    updateBottleLimit({ commit }, payload) {
        commit('updateBottleLimit', payload)
    },
    removeBottleLimit({ commit }, payload) {
        commit('removeBottleLimit', payload)
    }
}
