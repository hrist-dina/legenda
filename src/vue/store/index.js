import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cart from './cart'
import products from './products'

export default new Vuex.Store({
    modules: {
        cart,
        products
    }
})
