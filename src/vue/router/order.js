import router from '%vue%/router/base'
import CartPage from '%vue%/components/CartPage'
import AppCheckout from '%vue%/views/checkout/AppCheckout'
import CheckoutAuth from '%vue%/views/checkout/CheckoutAuth'
import CheckoutOrder from '%vue%/views/checkout/CheckoutFinal'
import CheckoutWelcome from '%vue%/views/checkout/CheckoutWelcome'
import CheckoutRegister from '%vue%/views/checkout/CheckoutRegister'
import CheckoutDelivery from '%vue%/views/checkout/CheckoutDelivery'
import CheckoutPayment from '%vue%/views/checkout/CheckoutPayment'
import CheckoutSuccess from '%vue%/views/checkout/CheckoutSuccess'
import {
    CHECKOUT_AUTH,
    CHECKOUT_DELIVERY,
    CHECKOUT_FINAL,
    CHECKOUT_PAYMENT,
    CHECKOUT_REGISTRATION,
    CHECKOUT_RESTORE,
    CHECKOUT_SUCCESS,
    CHECKOUT_WELCOME
} from '%vue%/store/checkout/state'
import CheckoutRestore from '%vue%/views/checkout/CheckoutRestore'

const routes = [
    {
        name: 'cart',
        path: '/#/cart',
        component: CartPage,
        meta: {
            title: 'Корзина',
            notSavedPosition: true // Параметр, если не нужно сохранять позицию скролла при переходе по страницам
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
                name: CHECKOUT_RESTORE,
                path: CHECKOUT_RESTORE,
                component: CheckoutRestore
            },
            {
                name: CHECKOUT_FINAL,
                path: CHECKOUT_FINAL,
                component: CheckoutOrder
            },
            {
                name: CHECKOUT_REGISTRATION,
                path: CHECKOUT_REGISTRATION,
                component: CheckoutRegister
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
    },
    {
        path: `/#/checkout/${CHECKOUT_SUCCESS}/:number/`,
        name: CHECKOUT_SUCCESS,
        component: CheckoutSuccess,
        meta: {
            title: 'Заказ оформлен'
        }
    }
]

export default router('/order/', routes, 'cart')
