import { deliveryItems } from './helpers'

export const personState = {
    fio: '',
    phone: '',
    email: '',
    birthDate: '',
    bottle: 0,
    bonus: null,
    balance: null
}

export default {
    id: null,
    token: null,
    person: personState,
    selectType: false,
    type: null,
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
