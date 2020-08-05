export default {
    setCities(state, payload) {
        state.cities = payload
    },
    setCity(state, payload) {
        state.cities.push({
            code: payload.code,
            name: payload.code,
            isLocation: payload.isLocation
        })
    },
    setNotification(state, payload) {
        state.notifications.push({
            time: new Date(),
            message: payload
        })
    },
    deleteNotification(state, payload) {
        const index = state.notifications.findIndex(
            i => i.time.timestamp === payload.time.timestamp
        )
        state.notifications.splice(index, 1)
    }
}
