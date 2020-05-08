import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cart from './cart'
import products from './products'

const store = new Vuex.Store({
    modules: {
        cart,
        products
    },
    strict: process.env.NODE_ENV !== 'production'
})

store.watch(state => {
    const cartProducts = state.cart.products
    console.log(cartProducts)
    localStorage.setItem(
        'cartProducts',
        !!cartProducts.length ? JSON.stringify(cartProducts) : '[]'
    )
    console.log(localStorage)
})

export default store
