import { phoneReplace } from '%common%/formatters'

export default {
    setId(state, payload) {
        state.id = payload.id
    },
    setToken(state, payload) {
        state.token = payload.token
    },
    setPersonalData(state, payload) {
        if (payload.fio) {
            state.person.fio = payload.fio
        }
        if (payload.email) {
            state.person.email = payload.email
        }
        if (payload.phone) {
            state.person.phone = payload.phone
        }
        if (payload.bonus) {
            state.person.bonus = payload.bonus
        }
        if (payload.bottle) {
            state.person.bottle = payload.bottle
        }
        if (payload.balance) {
            state.person.balance = payload.balance
        }
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
