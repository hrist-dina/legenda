export default {
    productsMap(state) {
        let map = {}
        state.products.forEach((item, i) => (map[item.id] = i))
        return map
    },
    productsDetailed: (state, getters, rootState, rootGetters) => {
        return state.products.map(pr => {
            const { title, price } = rootGetters['products/one'](pr.id)
            return {
                ...pr,
                title,
                price
            }
        })
    },
    cnt: state => state.products.reduce((total, pr) => total + pr.cnt, 0),
    total: (state, getters) =>
        getters.productsDetailed.reduce(
            (total, pr) => total + pr.price * pr.cnt,
            0
        ),
    inCart: (state, getters) => payload =>
        getters.productsMap.hasOwnProperty(payload.id) &&
        getters.isEqualCnt(payload),
    isEqualCnt: (state, getters) => payload => {
        const ind = getters.productsMap[payload.id]
        if (typeof ind === 'undefined') {
            return true
        }
        return state.products[ind].cnt === payload.cnt
    },
    inProcessing: state => id => state.processingId.includes(id),
    canAdd: (state, getters) => payload =>
        !getters.inCart(payload) && !getters.inProcessing(payload.id),
    canRemove: (state, getters) => payload =>
        getters.inCart(payload) && !getters.inProcessing(payload.id)
}
