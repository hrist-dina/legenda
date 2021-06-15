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
        if (!payload.error) {
            return
        }
        state.notifications.push({
            time: new Date(),
            message: payload.error,
            fixedMessage: payload.fixError || false
        })
    },
    deleteNotification(state, { time }) {
        const index = state.notifications.findIndex(
            i => i.time.timestamp === time.timestamp
        )
        state.notifications.splice(index, 1)
    }
}
