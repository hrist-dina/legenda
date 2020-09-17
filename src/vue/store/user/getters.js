import { getDeliveryLabel } from '%common%/formatters'

export default {
    getPerson: state => ({
        ...state.person,
        bonus: state.person.bonus || 0,
        bottle: state.person.bottle || 0,
        balance: state.person.balance || 0
    }),
    getDeliveryTypes: state => state.delivery.types,
    getPayment: state => state.payment,
    getDeliveryItems: state =>
        state.delivery.items.map(i => {
            if (i.city.name) {
                i.city.label = getDeliveryLabel(i)
            }
            return i
        }),
    getBonus: (state, getters) => getters.getPerson.bonus,
    getBottle: (state, getters) => getters.getPerson.bottle,
    getBalance: (state, getters) => getters.getPerson.balance,
    isAuth: state => !!state.token,
    isValidAddress: state =>
        !!state.selectDelivery.id || !!state.selectDelivery.address,
    isValidDate: state => !!state.selectDelivery.date,
    isValidTime: state => !!state.selectDelivery.time,
    isValidPaymentType: state => !!state.selectPaymentType,
    isValidCheckoutFinal: (state, getters) =>
        getters.isValidAddress &&
        getters.isValidDate &&
        getters.isValidTime &&
        getters.isValidPaymentType,
    getOrders: state => state.orders.data,
    getOrdersMeta: state => state.orders.meta
}
