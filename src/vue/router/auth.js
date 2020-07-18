import router from '%vue%/router/base'
import AppNav from '%vue%/views/auth/AppNav'
import AuthRegister from '%vue%/views/auth/AuthRegister'
import AuthLogin from '%vue%/views/auth/AuthLogin'

const routes = [
    {
        path: '',
        component: AppNav,
        meta: {
            title: 'Регистрация'
        },
        children: [
            {
                name: 'register',
                path: '/#/register',
                component: AuthRegister
            },
            {
                name: 'login',
                path: '/#/login',
                component: AuthLogin
            }
        ]
    }
]

export default router('/auth/', routes, 'register')
