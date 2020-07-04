export default {
    add(state, payload) {
        state.products.push(payload)
    },
    update(state, { id, cnt }) {
        const ind = state.products.findIndex(
            item => item.id.toString() === id.toString()
        )
        const item = state.products[ind]
        item.cnt = cnt
        state.products.splice(ind, 1, item)
    },
    remove(state, { id }) {
        const ind = state.products.findIndex(
            item => item.id.toString() === id.toString()
        )
        state.products.splice(ind, 1)
    },
    clean(state) {
        state.products = []
    },
    startProcessing(state, { id }) {
        state.processingId.push(id)
    },
    endProcessing(state, { id }) {
        const ind = state.products.indexOf(id)
        state.processingId.splice(ind, 1)
    }
}
