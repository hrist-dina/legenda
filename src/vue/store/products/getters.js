export default {
    itemsMap(state, getters) {
        let map = {}
        getters.all.forEach((item, i) => (map[item.id] = i))
        return map
    },
    one: (state, getters) => id => {
        const ind = getters.itemsMap[id]
        return getters.all[ind]
    },
    all: state => state.items,
    itemsOrderMap(state, getters) {
        let map = {}
        getters.allOrder.forEach((item, i) => (map[item.id] = i))
        return map
    },
    oneOrder: (state, getters) => id => {
        const ind = getters.itemsOrderMap[id]
        return getters.allOrder[ind]
    },
    allOrder: state => state.itemsOrder
}
