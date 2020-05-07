export default {
    add({ getters, commit }, payload) {
        if (getters.canAdd(payload)) {
            commit('startProcessing', payload)

            // TODO:: add request to server
            setTimeout(() => {
                if (!getters.isEqualCnt(payload)) {
                    commit('update', payload)
                } else {
                    commit('add', payload)
                }

                commit('endProcessing', payload)
            }, 200)
        }
    },
    remove({ getters, commit }, payload) {
        if (getters.canRemove(payload)) {
            commit('startProcessing', payload)

            // TODO:: add request to server for remove item form cart
            setTimeout(() => {
                commit('remove', payload)
                commit('endProcessing', payload)
            }, 200)
        }
    }
}
