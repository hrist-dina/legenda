import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import callbacks from '%vue%/router/callbacks'

const redirect = redirectName => ({
    path: '/',
    redirect: to => {
        const hash = to.hash
        const params = !!hash.length ? { path: hash } : { name: redirectName }
        return { ...params, hash: '' }
    }
})

const router = (base, routesData, redirectName) => {
    let routes = routesData
    if (redirectName) {
        routes = [redirect(redirectName), ...routesData]
    }
    const router = new VueRouter({
        mode: 'history',
        base: base,
        routes
    })
    callbacks(router)
    return router
}

export default router
