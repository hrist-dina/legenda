export default {
    add(state, payload) {
        state.products.push(payload)
    },
    addMany(state, payload) {
        state.products = payload
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
    },
    setIsLoading(state, payload) {
        state.isLoading = payload
    },
    setBottles(state, payload) {
        state.bottles = payload
    },
    updateBottle(state, { id, cnt }) {
        const ind = state.bottles.findIndex(
            item => item.id.toString() === id.toString()
        )
        const item = state.bottles[ind]
        item.cnt = cnt
        state.bottles.splice(ind, 1, item)
    },
    removeBottle(state, { id }) {
        const ind = state.bottles.findIndex(
            item => item.id.toString() === id.toString()
        )
        state.bottles.splice(ind, 1)
    },
    setBottlesLimit(state, payload) {
        state.bottlesLimit = payload
    },
    updateBottleLimit(state, { id, cnt }) {
        const ind = state.bottlesLimit.findIndex(
            item => item.id.toString() === id.toString()
        )
        const item = state.bottlesLimit[ind]
        if (item.limit < cnt) {
            return
        }
        item.cnt = cnt
        state.bottlesLimit.splice(ind, 1, item)
    },
    removeBottleLimit(state, { id }) {
        const ind = state.bottlesLimit.findIndex(
            item => item.id.toString() === id.toString()
        )
        state.bottlesLimit.splice(ind, 1)
    }
}
