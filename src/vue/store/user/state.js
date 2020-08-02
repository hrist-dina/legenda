const token = localStorage.getItem('token')
const deliveryItems = JSON.parse(localStorage.getItem('deliveryItems'))
export default {
    id: null,
    token: token === 'null' ? null : token || null,
    person: {
        fio: '',
        phone: '',
        email: '',
        bonus: 0,
        bottle: 0,
        balance: 0
    },
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
