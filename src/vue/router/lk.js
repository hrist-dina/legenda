import router from '%vue%/router/base'
import AppLkView from '%vue%/views/lk/AppLkView'
import LkOrders from '%vue%/views/lk/LkOrders'
import LkServices from '%vue%/views/lk/LkServices'
import LkPersonalData from '%vue%/views/lk/LkPersonalData'
import LkAddress from '%vue%/views/lk/LkAddress'
export const LK_ORDERS = 'orders'
export const LK_SERVICES = 'services'
export const LK_PERSONAL_DATA = 'persona-data'
export const LK_ADDRESS = 'address'

const LK_TITLE = 'Личный кабинет'
const getChildrenTitle = title => `${LK_TITLE} | ${title}`

const routes = [
    {
        baseRoute: true,
        path: '/#/',
        component: AppLkView,
        meta: {
            title: LK_TITLE
        },
        children: [
            {
                name: LK_ORDERS,
                path: `${LK_ORDERS}/:name?/:id?`, // Params for pagination
                component: LkOrders,
                meta: {
                    title: getChildrenTitle('Заказы'),
                    tabTitle: 'Заказы'
                },
                props: route => ({ currentPage: Number(route.params.id || 1) })
            },
            // TODO:: временно нет
            // {
            //     name: LK_SERVICES,
            //     path: LK_SERVICES,
            //     component: LkServices,
            //     meta: {
            //         title: getChildrenTitle('Услуги'),
            //         tabTitle: 'Услуги'
            //     }
            // },
            {
                name: LK_PERSONAL_DATA,
                path: LK_PERSONAL_DATA,
                component: LkPersonalData,
                meta: {
                    title: getChildrenTitle('Личные данные'),
                    tabTitle: 'Личные данные'
                }
            },
            {
                name: LK_ADDRESS,
                path: LK_ADDRESS,
                component: LkAddress,
                meta: {
                    title: getChildrenTitle('Адреса'),
                    tabTitle: 'Адреса'
                }
            }
        ]
    }
]

export default router('/lk/', routes, 'orders')
