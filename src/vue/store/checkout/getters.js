export default {
    getHasLogin: (state, getters, rootState, rootGetters) => {
        return !!rootGetters['user/isAuth'] || state.hasLogin
    }
}
