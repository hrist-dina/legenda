export default {
    id: null,
    token: null,
    person: {
        fio: '',
        phone: '',
        email: ''
    },
    delivery: {
        types: [
            {
                code: 'home',
                name: 'Домой'
            },
            {
                code: 'work',
                name: 'На работу'
            }
        ],
        items: []
    },
    payment: [
        {
            code: 'money',
            name: 'Наличные',
            selected: true
        },
        {
            code: 'bank-card',
            name: 'Банковской картой'
        }
    ],
    selectPaymentType: null
}
