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
    all: state => state.items
}
