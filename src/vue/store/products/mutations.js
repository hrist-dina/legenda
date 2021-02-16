export default {
    addItems(state, payload) {
        state.items = payload.items
    },
    addItemsOrder(state, payload) {
        state.itemsOrder = payload.itemsOrder
    },
    setIsLoading(state, payload) {
        state.isLoading = payload
    }
}
