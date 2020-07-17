import router from '%vue%/router/base'
import AppNav from '%vue%/views/auth/AppNav'
import AuthRegister from '%vue%/views/auth/AuthRegister'

const routes = [
    {
        path: '/#/register',
        component: AppNav,
        meta: {
            title: 'Регистрация'
        },
        children: [
            {
                name: 'register',
                path: '',
                component: AuthRegister
            }
        ]
    }
]

export default router('/auth/', routes, 'register')
