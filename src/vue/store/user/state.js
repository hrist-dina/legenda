const token = localStorage.getItem('token')
export default {
    id: null,
    token: token === 'null' ? null : token || null,
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
            label: 'Наличные',
            selected: true
        },
        {
            code: 'bank-card',
            label: 'Банковской картой'
        }
    ],
    selectPaymentType: null
}
