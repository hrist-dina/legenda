import Vue from 'vue'
import Vuex from 'vuex'
import '../directive'
import { initStoreWatch } from './watch'

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

initStoreWatch(store)

export default store
