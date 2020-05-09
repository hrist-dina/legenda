import router from '%vue%/router/base'
import CartPage from '%vue%/components/CartPage'
import Checkout from '%vue%/components/Checkout'
import E404 from '%vue%/components/E404'

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
        name: 'checkout',
        path: '/#/checkout',
        component: Checkout,
        meta: {
            title: 'Оформление заказа'
        }
    },
    {
        path: '*',
        component: E404
    }
]

export default router('/order/', routes, 'cart')
