export default {
    add(state, payload) {
        state.favorites.push(payload)
    },
    /**
     * @param state
     * @param payload string[]
     */
    concat(state, payload) {
        const data = payload.map(i => ({ id: i }))
        state.favorites = state.favorites.concat(
            data.filter(i => !state.favorites.find(n => n.id === i.id))
        )
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
