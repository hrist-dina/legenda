import { getDeliveryLabel } from '%common%/formatters'

export default {
    getPerson: ({ person }) => ({
        ...person,
        bottle: person.bottle || 0,
        bonus: person.bonus ?? null,
        balance: person.balance ?? null
    }),
    hasSelectType: state => state.selectType,
    hasNeedEmail: state => state.needEmail,
    getDeliveryTypes: state => state.delivery.types,
    getSelectDelivery: state => state.selectDelivery,
    getPayment: state => state.payment,
    getDeliveryItems: state =>
        state.delivery.items.map(i => ({
            ...i,
            city: {
                ...i.city,
                label: getDeliveryLabel(i)
            }
        })),
    getAddressList: state =>
        state.delivery.items.map(i => ({
            ...i,
            city: {
                ...i.city,
                label: i.city.name
            }
        })),
    getBonus: (state, getters) => getters.getPerson.bonus || 0,
    getBottle: (state, getters) => getters.getPerson.bottle || 0,
    getBalance: (state, getters) => getters.getPerson.balance || 0,
    isAuth: state => !!state.id,
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
    getOrdersMeta: state => state.orders.meta,
    isSpendBonus: state => state.isSpendBonus,
    isSpendBottle: state => state.isSpendBottle
}
