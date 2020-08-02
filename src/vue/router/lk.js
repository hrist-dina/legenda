import router from '%vue%/router/base'
import AppLkView from '%vue%/views/lk/AppLkView'
import LkOrders from '%vue%/views/lk/LkOrders'
import LkServices from '%vue%/views/lk/LkServices'
export const LK_ORDERS = 'orders'
export const LK_SERVICES = 'services'

const routes = [
    {
        baseRoute: true,
        path: '/#/',
        component: AppLkView,
        meta: {
            title: 'Личный кабинет'
        },
        children: [
            {
                name: LK_ORDERS,
                path: `${LK_ORDERS}/:name?/:id?`, // Params for pagination
                component: LkOrders,
                meta: {
                    title: 'Заказы'
                },
                props: route => ({ currentPage: Number(route.params.id) })
            },
            {
                name: LK_SERVICES,
                path: LK_SERVICES,
                component: LkServices,
                meta: {
                    title: 'Услуги'
                }
            }
        ]
    }
]

export default router('/lk/', routes, 'orders')
