export const CHECKOUT_WELCOME = 'welcome'
export const CHECKOUT_AUTH = 'auth'
export const CHECKOUT_RESTORE = 'restore'
export const CHECKOUT_FINAL = 'final'
export const CHECKOUT_REGISTRATION = 'registration'
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
                name: CHECKOUT_REGISTRATION,
                title: 'Регистрация'
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
