import router from '%vue%/router/base'
import CartPage from '%vue%/components/CartPage'
import AppCheckout from '%vue%/views/checkout/AppCheckout'
import CheckoutAuth from '%vue%/views/checkout/CheckoutAuth'
import CheckoutWelcome from '%vue%/views/checkout/CheckoutWelcome'
import CheckoutPersonalData from '%vue%/views/checkout/CheckoutPersonalData'
import CheckoutDelivery from '%vue%/views/checkout/CheckoutDelivery'
import CheckoutPayment from '%vue%/views/checkout/CheckoutPayment'
import {
    CHECKOUT_AUTH,
    CHECKOUT_DELIVERY,
    CHECKOUT_PAYMENT,
    CHECKOUT_PERSONAL_DATA,
    CHECKOUT_WELCOME
} from '%vue%/store/checkout/state'

const routes = [
    {
        name: 'cart',
        path: '/#/cart',
        component: CartPage,
        meta: {
            title: 'Корзина'
        }
    },
    {
        path: '/#/checkout',
        component: AppCheckout,
        meta: {
            title: 'Оформление заказа'
        },
        children: [
            {
                name: CHECKOUT_WELCOME,
                path: '',
                component: CheckoutWelcome
            },
            {
                name: CHECKOUT_AUTH,
                path: CHECKOUT_AUTH,
                component: CheckoutAuth
            },
            {
                name: CHECKOUT_PERSONAL_DATA,
                path: CHECKOUT_PERSONAL_DATA,
                component: CheckoutPersonalData
            },
            {
                name: CHECKOUT_DELIVERY,
                path: CHECKOUT_DELIVERY,
                component: CheckoutDelivery
            },
            {
                name: CHECKOUT_PAYMENT,
                path: CHECKOUT_PAYMENT,
                component: CheckoutPayment
            }
        ]
    }
]

export default router('/order/', routes, 'cart')
