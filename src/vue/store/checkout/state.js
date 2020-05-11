export const CHECKOUT_WELCOME = 'welcome'
export const CHECKOUT_AUTH = 'auth'
export const CHECKOUT_PERSONAL_DATA = 'personal-data'

export default {
    activeStep: 'welcome',
    hasLogin: false,
    steps: {
        welcome: {
            name: CHECKOUT_WELCOME,
            title: 'Приветствуем!'
        },
        auth: [
            {
                name: 'auth',
                title: 'Авторизация'
            },
            {
                name: 'order',
                title: 'Оформление заказа'
            }
        ],
        withoutLogin: [
            {
                name: CHECKOUT_PERSONAL_DATA,
                title: 'Личные данные'
            },
            { name: 'delivery', title: 'Доставка' },
            {
                name: 'payment',
                title: 'Оплата'
            }
        ]
    }
}
