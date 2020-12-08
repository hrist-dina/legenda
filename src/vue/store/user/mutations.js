import { personState } from '%vue%/store/user/state'
import { pushToArray } from '%common%/helper'

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
        if (payload.bottle) {
            state.person.bottle = payload.bottle
        }
        if (payload.bonus != null) {
            state.person.bonus = payload.bonus
        }
        if (payload.balance != null) {
            state.person.balance = payload.balance
        }
        if (typeof payload.birthDate !== 'undefined') {
            state.person.birthDate = payload.birthDate
        }
    },
    cleanPersonData(state) {
        state.person = personState
    },
    setDeliveryItem(state, payload) {
        pushToArray(state.delivery.items, {
            id: payload.id,
            type: payload.type,
            title: payload.title || '',
            city: payload.city,
            address: payload.address,
            date: payload.date,
            time: payload.time
        })
    },
    cleanDeliveryItems(state) {
        state.delivery.items = []
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
    },
    setOrders(state, payload) {
        state.orders.data = payload.data
        if (payload.meta) {
            state.orders.meta = payload.meta
        }
    }
}
