import Vue from 'vue'
import Vuex from 'vuex'
import '../filter'
import { initStoreWatch } from './watch'

Vue.use(Vuex)

import cart from './cart'
import products from './products'
import checkout from './checkout'
import user from './user'
import favorite from './favorite'

const store = new Vuex.Store({
    modules: {
        cart,
        products,
        checkout,
        user,
        favorite
    },
    strict: process.env.NODE_ENV !== 'production'
})

initStoreWatch(store)

export default store
