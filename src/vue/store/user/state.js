import { token, deliveryItems, getPersonFromStorage } from './helpers'

export const personState = {
    fio: '',
    phone: '',
    email: '',
    birthDate: '',
    bonus: 0,
    bottle: 0,
    balance: 0
}

export default {
    id: null,
    token: null,
    person: personState,
    delivery: {
        types: [
            {
                code: 'home',
                name: 'Домой'
            },
            {
                code: 'office',
                name: 'В офис'
            }
        ],
        items: deliveryItems || []
    },
    payment: [
        {
            code: 'money',
            label: 'Наличные',
            selected: true
        },
        {
            code: 'bank-card',
            label: 'Банковской картой'
        }
    ],
    selectPaymentType: null,
    selectDelivery: {},
    isSpendBonus: false,
    isSpendBottle: false,
    orders: {
        data: [],
        meta: {}
    }
}
