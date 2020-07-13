export default {
    favoritesMap(state) {
        let map = {}
        state.favorites.forEach((item, i) => (map[item.id] = i))
        return map
    },
    favoritesDetailed: (state, getters, rootState, rootGetters) => {
        return state.favorites.reduce((tot, pr) => {
            const favorite = rootGetters['products/one'](pr.id)
            if (!favorite) return tot
            tot.push({
                ...favorite,
                ...pr
            })
            return tot
        }, [])
    },
    cnt: state => state.favorites.length,
    favoriteById: (state, getters) => id => {
        const ind = getters.favoritesMap[id]
        return state.favorites[ind]
    },
    inFavorite: (state, getters) => payload =>
        getters.favoritesMap.hasOwnProperty(payload.id),
    inProcessingFavorite: state => id =>
        state.processingFavoritesId.includes(id),
    canAddFavorite: (state, getters) => payload =>
        !getters.inFavorite(payload) &&
        !getters.inProcessingFavorite(payload.id),
    canRemoveFavorite: (state, getters) => payload =>
        getters.inFavorite(payload) && !getters.inProcessingFavorite(payload.id)
}
