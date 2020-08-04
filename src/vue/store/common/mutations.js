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
    }
}
