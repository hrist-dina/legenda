import {
    CHECKOUT_AUTH,
    CHECKOUT_PERSONAL_DATA
} from '%vue%/store/checkout/state'
import { backStep, nextStep } from '%vue%/store/checkout/helper'

export default {
    setHasLogin({ commit }, payload) {
        commit('setHasLogin', payload)
        if (payload.hasLogin) {
            commit('setActiveStep', { activeStep: CHECKOUT_AUTH })
        } else {
            commit('setActiveStep', { activeStep: CHECKOUT_PERSONAL_DATA })
        }
    },
    setActiveStep({ commit }, payload) {
        commit('setActiveStep', { activeStep: payload.activeStep })
    },
    getDataByName: ({ state }, name) => {
        let title = ''
        Object.values(state.steps).forEach(el => {
            let findElem
            if (Array.isArray(el)) {
                findElem = el.find(e => e.name === name)
            }
            /* eslint-disable */
            let findTitle =
                Array.isArray(el) && findElem
                    ? findElem.title
                    : el.name === name
                    ? el.title
                    : ''
            /* eslint-enable */
            if (!!findTitle.length) {
                title = findTitle
            }
        })
        return title
    },
    next({ state, commit }) {
        const activeStep = state.activeStep
        const steps = Object.values(state.steps)
        return nextStep(steps, activeStep, commit)
    },
    back({ state, commit }) {
        const activeStep = state.activeStep
        const steps = Object.values(state.steps)
        return backStep(steps, activeStep, commit)
    },
    nextReplenish({ state, commit }) {
        return nextStep(state.replenish, state.activeStep, commit)
    },
    backReplenish({ state, commit }) {
        return backStep(state.replenish, state.activeStep, commit)
    }
}
