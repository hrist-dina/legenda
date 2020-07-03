import router from '%vue%/router/base'
import AppLkView from '%vue%/views/lk/AppLkView'
import CheckoutWelcome from '%vue%/views/checkout/CheckoutWelcome'

const routes = [
    {
        path: '/#/orders',
        component: AppLkView,
        meta: {
            title: 'Личный кабинет'
        },
        children: [
            {
                name: 'orders',
                path: '',
                component: CheckoutWelcome
            }
        ]
    }
]

export default router('/lk/', routes, 'orders')
