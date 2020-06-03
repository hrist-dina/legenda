export default {
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
        items: [
            {
                type: {
                    code: '',
                    name: ''
                },
                city: {
                    code: '',
                    value: ''
                },
                address: '',
                date: '',
                time: ''
            }
        ]
    },
    payment: [
        {
            code: 'money',
            name: 'Наличные'
        },
        {
            code: 'bank-card',
            name: 'Банковской картой'
        }
    ]
}
