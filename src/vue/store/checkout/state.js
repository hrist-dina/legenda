export const CHECKOUT_WELCOME = 'welcome'
export const CHECKOUT_AUTH = 'auth'
export const CHECKOUT_FINAL = 'final'
export const CHECKOUT_PERSONAL_DATA = 'personal-data'
export const CHECKOUT_DELIVERY = 'delivery'
export const CHECKOUT_PAYMENT = 'payment'
export const CHECKOUT_SUCCESS = 'success'

export default {
    activeStep: CHECKOUT_WELCOME,
    hasLogin: false,
    steps: {
        welcome: {
            name: CHECKOUT_WELCOME,
            title: 'Приветствуем!'
        },
        auth: [
            {
                name: CHECKOUT_AUTH,
                title: 'Авторизация'
            },
            {
                name: CHECKOUT_FINAL,
                title: 'Оформление заказа'
            }
        ],
        withoutLogin: [
            {
                name: CHECKOUT_PERSONAL_DATA,
                title: 'Личные данные'
            },
            { name: CHECKOUT_DELIVERY, title: 'Доставка' },
            {
                name: CHECKOUT_PAYMENT,
                title: 'Оплата'
            }
        ]
    },
    replenish: [
        {
            name: CHECKOUT_PAYMENT,
            title: 'Способ оплаты'
        },
        { name: CHECKOUT_DELIVERY, title: 'Оплата на адрес' }
    ]
}
