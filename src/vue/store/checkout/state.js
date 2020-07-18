export const CHECKOUT_WELCOME = 'welcome'
export const CHECKOUT_AUTH = 'auth'
export const CHECKOUT_PERSONAL_DATA = 'personal-data'
export const CHECKOUT_DELIVERY = 'delivery'
export const CHECKOUT_PAYMENT = 'payment'
export const CHECKOUT_ORDER = 'order'
export const CHECKOUT_SUCCESS = 'success'

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
                name: CHECKOUT_AUTH,
                title: 'Авторизация'
            },
            {
                name: CHECKOUT_ORDER,
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
    }
}
