export default {
    getPerson: state => state.person,
    getDeliveryTypes: state => state.delivery.types,
    getPayment: state => state.payment,
    getDeliveryItems: state => state.delivery.items,
    getBonus: (state, getters) => getters.getPerson.bonus,
    getBottle: (state, getters) => getters.getPerson.bottle,
    getBalance: (state, getters) => getters.getPerson.balance,
    isAuth: state => !!state.token,
    isValidAddress: state => !!state.selectDelivery.address,
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
