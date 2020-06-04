export default {
    setToken(state, payload) {
        state.token = payload.token
    },
    setPersonalData(state, payload) {
        state.person.fio = payload.fio
        state.person.email = payload.email
        state.person.phone = payload.phone
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
    }
}
