export default {
    productsMap(state) {
        let map = {}
        state.products.forEach((item, i) => (map[item.id] = i))
        return map
    },
    productsDetailed: (state, getters, rootState, rootGetters) => {
        return state.products.map(pr => {
            const { title, description, price } = rootGetters['products/one'](
                pr.id
            )
            return {
                ...pr,
                title,
                description,
                price
            }
        })
    },
    cnt: state => state.products.length,
    total: (state, getters) =>
        getters.productsDetailed.reduce(
            (total, pr) => total + pr.price * pr.cnt,
            0
        ),
    dataById: (state, getters) => id => {
        const ind = getters.productsMap[id]
        return state.products[ind]
    },
    inCart: (state, getters) => payload =>
        getters.productsMap.hasOwnProperty(payload.id),
    isEqualCnt: (state, getters) => payload => {
        const ind = getters.productsMap[payload.id]
        if (typeof ind === 'undefined') {
            return true
        }
        return state.products[ind].cnt === payload.cnt
    },
    inProcessing: state => id => state.processingId.includes(id),
    canAdd: (state, getters) => payload =>
        !(getters.inCart(payload) && getters.isEqualCnt(payload)) &&
        !getters.inProcessing(payload.id),
    canRemove: (state, getters) => payload =>
        getters.inCart(payload) && !getters.inProcessing(payload.id)
}
