export const personState = {
    fio: '',
    phone: '',
    email: '',
    birthDate: '',
    bottle: 0,
    bonus: null,
    balance: null
}

export const PAYMENT_MONEY = 'money'
export const PAYMENT_BANK_CARD = 'bank-card'
export const PAYMENT_METHOD_REPLENISH = 'replenish'
export const PAYMENT_METHOD_WRITE_OFF = 'write-off'

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
            code: PAYMENT_MONEY,
            label: 'Наличные',
            selected: true
        },
        {
            code: PAYMENT_BANK_CARD,
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
