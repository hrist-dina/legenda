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
    needEmail: false,
    type: null,
    message: null,
    disabledBeforeDateDelivery: undefined,
    disabledAfterDateDelivery: undefined,
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
        items: []
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
