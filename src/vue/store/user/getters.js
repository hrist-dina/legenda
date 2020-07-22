export default {
    getPerson: state => {
        const fromStorage = JSON.parse(localStorage.getItem('person'))
        const person = state.person
        let data = {}
        for (let key in person) {
            data[key] = !person[key].length ? fromStorage[key] : person[key]
        }
        return data
    },
    getDeliveryTypes: state => state.delivery.types,
    getPayment: state => state.payment,
    getDeliveryItems: state => state.delivery.items,
    getBonus: state => state.person.bonus,
    getBottle: state => state.person.bottle,
    isAuth: state => !!state.token,
    isValidAddress: state => !!state.selectDelivery.address,
    isValidDate: state => !!state.selectDelivery.date,
    isValidTime: state => !!state.selectDelivery.time,
    isValidPaymentType: state => !!state.selectPaymentType,
    isValidCheckoutFinal: (state, getters) =>
        getters.isValidAddress &&
        getters.isValidDate &&
        getters.isValidTime &&
        getters.isValidPaymentType
}
