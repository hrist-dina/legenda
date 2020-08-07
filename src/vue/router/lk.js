import router from '%vue%/router/base'
import AppLkView from '%vue%/views/lk/AppLkView'
import LkOrders from '%vue%/views/lk/LkOrders'
import LkServices from '%vue%/views/lk/LkServices'
import LkReplenish from '%vue%/views/lk/LkReplenish'
import LkPersonalData from '%vue%/views/lk/LkPersonalData'
import LkAddress from '%vue%/views/lk/LkAddress'
import LkReplenishPayment from '%vue%/views/lk/LkReplenishPayment'
import LkReplenishDelivery from '%vue%/views/lk/LkReplenishDelivery'
import LkWriteOff from '%vue%/views/lk/LkWriteOff'
import LkOrderRepeat from '%vue%/views/lk/LkOrderRepeat'
import {
    LK_ADDRESS,
    LK_ORDER_REPEAT,
    LK_ORDERS,
    LK_PERSONAL_DATA,
    LK_REPLENISH,
    LK_REPLENISH_DELIVERY,
    LK_REPLENISH_PAYMENT,
    LK_WRITE_OFF
} from '%vue%/router/constants'

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
                    tabTitle: 'Заказы',
                    tabName: LK_ORDERS
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
                path: LK_REPLENISH,
                component: LkReplenish,
                meta: {
                    title: getChildrenTitle('Пополнить'),
                    tabTitle: 'Пополнить',
                    tabName: LK_REPLENISH_PAYMENT
                },
                children: [
                    {
                        name: LK_REPLENISH_PAYMENT,
                        path: LK_REPLENISH_PAYMENT,
                        component: LkReplenishPayment
                    },
                    {
                        name: LK_REPLENISH_DELIVERY,
                        path: LK_REPLENISH_DELIVERY,
                        component: LkReplenishDelivery
                    }
                ]
            },
            {
                name: LK_WRITE_OFF,
                path: LK_WRITE_OFF,
                component: LkWriteOff,
                meta: {
                    title: getChildrenTitle('Списать'),
                    tabTitle: 'Списать',
                    tabName: LK_WRITE_OFF
                }
            },
            {
                name: LK_PERSONAL_DATA,
                path: LK_PERSONAL_DATA,
                component: LkPersonalData,
                meta: {
                    title: getChildrenTitle('Личные данные'),
                    tabTitle: 'Личные данные',
                    tabName: LK_PERSONAL_DATA
                }
            },
            {
                name: LK_ADDRESS,
                path: LK_ADDRESS,
                component: LkAddress,
                meta: {
                    title: getChildrenTitle('Адреса'),
                    tabTitle: 'Адреса',
                    tabName: LK_ADDRESS
                }
            }
        ]
    },
    {
        path: `/#/order/${LK_ORDER_REPEAT}/:number/`,
        name: LK_ORDER_REPEAT,
        component: LkOrderRepeat,
        meta: {
            title: 'Повторить заказ'
        }
    }
]

export default router('/lk/', routes, 'orders')
