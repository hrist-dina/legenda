import {
    CHECKOUT_AUTH,
    CHECKOUT_PERSONAL_DATA
} from '%vue%/store/checkout/state'

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
            /*1 eslint-enable */
            if (!!findTitle.length) {
                title = findTitle
            }
        })
        return title
    },
    back({ state, commit }) {
        const activeStep = state.activeStep
        const steps = Object.values(state.steps)
        let nameToBack = ''
        steps.forEach((item, i) => {
            let backElem = steps[i - 1]
            if (Array.isArray(item)) {
                let index = item.findIndex(el => el.name === activeStep)
                if (index === 0) {
                    nameToBack = steps[0].name
                } else if (index > 0) {
                    nameToBack = item[index - 1].name
                }
            } else {
                nameToBack = backElem ? backElem.name : activeStep
            }
        })

        if (nameToBack !== activeStep) {
            commit('setActiveStep', { activeStep: nameToBack })
        }
        return nameToBack
    },
    next({ state, commit }) {
        const activeStep = state.activeStep
        const steps = Object.values(state.steps)
        let nameToNext = ''
        steps.forEach((item, i) => {
            let nextElem = steps[i + 1]

            if (Array.isArray(item)) {
                let index = item.findIndex(el => el.name === activeStep)
                if ((index === 0 || index > 0) && item[index + 1]) {
                    nameToNext = item[index + 1].name
                }
            } else {
                nameToNext = nextElem ? nextElem.name : activeStep
            }
        })

        if (nameToNext !== activeStep) {
            commit('setActiveStep', { activeStep: nameToNext })
        }
        return nameToNext
    }
}
