export default {
    getHasLogin: (state, getters, rootState) => {
        return !!rootState.user.token || state.hasLogin
    }
}
