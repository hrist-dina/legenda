export default {
    setId(state, payload) {
        state.id = payload.id
    },
    setToken(state, payload) {
        state.token = payload.token
    },
    setPersonalData(state, payload) {
        state.person.fio = payload.fio
        state.person.email = payload.email
        state.person.phone = payload.phone
        state.person.bonus = payload.bonus
        state.person.bottle = payload.bottle
    },
    setDeliveryItem(state, payload) {
        state.delivery.items.push({
            type: payload.type,
            title: payload.title || '',
            city: {
                code: '',
                value: ''
            },
            address: payload.address,
            date: payload.date,
            time: payload.time
        })
    },
    setSelectedPaymentType(state, payload) {
        state.selectPaymentType = payload.selectPaymentType
    },
    setSelectedDelivery(state, payload) {
        state.selectDelivery = payload.selectDelivery
    },
    setIsSpendBonus(state, payload) {
        state.isSpendBonus = payload
    },
    setIsSpendBottle(state, payload) {
        state.isSpendBottle = payload
    }
}
