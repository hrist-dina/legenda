export default {
    setHasLogin(state, payload) {
        state.hasLogin = payload.hasLogin
    },
    setActiveStep(state, payload) {
        state.activeStep = payload.activeStep
    }
}
