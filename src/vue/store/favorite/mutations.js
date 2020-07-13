export default {
    add(state, payload) {
        state.favorites.push(payload)
    },
    remove(state, { id }) {
        const ind = state.favorites.findIndex(
            item => item.id.toString() === id.toString()
        )
        state.favorites.splice(ind, 1)
    },
    clean(state) {
        state.favorites = []
    },
    startProcessing(state, { id }) {
        state.processingFavoritesId.push(id)
    },
    endProcessing(state, { id }) {
        const ind = state.favorites.indexOf(id)
        state.processingFavoritesId.splice(ind, 1)
    }
}
