export default {
    productsMap(state) {
        let map = {}
        state.products.forEach((item, i) => (map[item.id] = i))
        return map
    },
    productsDetailed: (state, getters, rootState, rootGetters) => {
        return state.products.reduce((tot, pr) => {
            const product = rootGetters['products/one'](pr.id)
            if (!product) return tot
            tot.push({
                ...product,
                ...pr
            })
            return tot
        }, [])
    },
    cnt: state => state.products.length,
    total: (state, getters) =>
        getters.productsDetailed.reduce(
            (total, pr) => total + pr.price * pr.cnt,
            0
        ),
    bonus: (state, getters) => getters.total * (8 / 100),
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
        getters.inCart(payload) && !getters.inProcessing(payload.id),
    isLoading: state => state.isLoading,
    getBottles: state => state.bottles,
    getBottlesLimit: state => state.bottlesLimit,
    warningMessages: state => state.warningMessages
}
