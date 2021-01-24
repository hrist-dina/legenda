export const nextStep = (steps, activeStep, commit, checkNext = false) => {
    let nameToNext = ''
    steps.forEach((item, i) => {
        let nextElem = steps[i + 1]

        if (checkNext && !nextElem) {
            return
        }

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

export const backStep = (steps, activeStep, commit) => {
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
}
