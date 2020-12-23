import Vue from 'vue'
import vSelect from 'vue-select'
import QuantityCounter from '%vue%/components/QuantityCounter'
import Product from '%vue%/components/Product'
import Cart from '%vue%/components/Cart'
import ComponentVue from '%vue%/ComponentVue'
import Location from '%vue%/components/Location'
import AppOrder from '%vue%/views/AppOrder'
import AppLk from '%vue%/views/AppLk'
import routerOrder from '%vue%/router/order'
import routerLk from '%vue%/router/lk'
import routerAuth from '%vue%/router/auth'
import AppAuth from '%vue%/views/AppAuth'
import AppNotification from '%vue%/components/AppNotification'
import FavoritePage from '%vue%/components/FavoritePage'
import AppModalMessage from '%vue%/components/AppModalMessage'
import { SELECTOR_PRODUCT } from '%vue%/component-selectors'

Vue.component('v-select', vSelect)

new ComponentVue(SELECTOR_PRODUCT, Product, false)
new ComponentVue('.js-vue-cart', Cart, false)
new ComponentVue('.js-vue-location', Location, false)

new ComponentVue('.js-vue-quantity', QuantityCounter)
new ComponentVue('.js-vue-favorite-page', FavoritePage)

new ComponentVue('.js-vue-app-notification', AppNotification)
new ComponentVue('.js-vue-app-modal-message', AppModalMessage)
new ComponentVue('.js-vue-app-order', AppOrder, true, { router: routerOrder })
new ComponentVue('.js-vue-app-lk', AppLk, true, { router: routerLk })
new ComponentVue('.js-vue-app-auth', AppAuth, true, { router: routerAuth })
