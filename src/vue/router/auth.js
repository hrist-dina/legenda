import router from '%vue%/router/base'
import AppNav from '%vue%/views/auth/AppNav'
import AuthRegister from '%vue%/views/auth/AuthRegister'
import AuthLogin from '%vue%/views/auth/AuthLogin'
import AuthRestore from '%vue%/views/auth/AuthRestore'

export const AUTH_REGISTER = 'register'
export const AUTH_LOGIN = 'login'
export const AUTH_RESTORE = 'restore'

const routes = [
    {
        baseRoute: true,
        path: '',
        component: AppNav,
        meta: {
            title: 'Регистрация'
        },
        children: [
            {
                name: AUTH_REGISTER,
                path: '/#/register',
                component: AuthRegister,
                meta: {
                    title: 'Регистрация',
                    tabTitle: 'Регистрация'
                }
            },
            {
                name: AUTH_LOGIN,
                path: '/#/login',
                component: AuthLogin,
                meta: {
                    title: 'Войти с паролем',
                    tabTitle: 'Войти с паролем'
                }
            },
            {
                name: AUTH_RESTORE,
                path: '/#/restore',
                component: AuthRestore,
                meta: {
                    title: 'Восстановить пароль'
                }
            }
        ]
    }
]

export default router('/auth/', routes, 'register')
