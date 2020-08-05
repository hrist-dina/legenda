export default {
    setNotification({ commit }, payload) {
        commit('setNotification', payload)
    },
    deleteNotification({ commit }, payload) {
        commit('deleteNotification', payload)
    }
}
