import Vue from 'vue'
import Vuex from 'vuex'
import '../filter'
import { initStoreWatch } from './watch'
import Init from './init'

Vue.use(Vuex)

import cart from './cart'
import common from './common'
import products from './products'
import checkout from './checkout'
import user from './user'
import favorite from './favorite'

const store = new Vuex.Store({
    modules: {
        cart,
        common,
        products,
        checkout,
        user,
        favorite
    },
    strict: process.env.NODE_ENV !== 'production'
})

if (window.__INITIAL_STATE__) {
    // Инициализируем состояние хранилища данными
    new Init(store, window.__INITIAL_STATE__)
}

initStoreWatch(store)

export default store
