import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cart from './cart'
import products from './products'
import checkout from './checkout'
import user from './user'

const store = new Vuex.Store({
    modules: {
        cart,
        products,
        checkout,
        user
    },
    strict: process.env.NODE_ENV !== 'production'
})

store.watch(
    state => state.cart.products,
    newVal => {
        const cartProducts = newVal
        localStorage.setItem(
            'cartProducts',
            !!cartProducts.length ? JSON.stringify(cartProducts) : '[]'
        )
    }
)

store.watch(
    state => state.user.token,
    newVal => {
        localStorage.setItem('token', JSON.stringify(newVal))
    }
)

store.watch(
    state => state.user.person,
    newVal => {
        localStorage.setItem('person', JSON.stringify(newVal))
    },
    {
        deep: true
    }
)

export default store
