import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cart from './cart'
import products from './products'
import checkout from './checkout'

const store = new Vuex.Store({
    modules: {
        cart,
        products,
        checkout
    },
    strict: process.env.NODE_ENV !== 'production'
})

store.watch(state => {
    const cartProducts = state.cart.products
    localStorage.setItem(
        'cartProducts',
        !!cartProducts.length ? JSON.stringify(cartProducts) : '[]'
    )
})

export default store
