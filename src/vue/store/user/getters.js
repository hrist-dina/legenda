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
    isAuth: state => state.token
}
