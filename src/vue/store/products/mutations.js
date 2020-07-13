export default {
    addItems(state, payload) {
        state.items = payload.items
    },
    setIsLoading(state, payload) {
        state.isLoading = payload
    }
}
