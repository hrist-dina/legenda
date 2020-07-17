import QuantityCounter from '%vue%/components/QuantityCounter'
import Product from '%vue%/components/Product'
import Cart from '%vue%/components/Cart'
import ComponentVue from '%vue%/ComponentVue'
import FilterItem from '%vue%/components/FilterItem'
import Location from '%vue%/components/Location'
import AppOrder from '%vue%/views/AppOrder'
import AppLk from '%vue%/views/AppLk'
import routerOrder from '%vue%/router/order'
import routerLk from '%vue%/router/lk'
import routerAuth from '%vue%/router/auth'
import AppAuth from '%vue%/views/AppAuth'

new ComponentVue('.js-vue-product', Product, false)
new ComponentVue('.js-vue-cart', Cart, false)
new ComponentVue('.js-vue-filter-item', FilterItem, false)
new ComponentVue('.js-vue-location', Location, false)

new ComponentVue('.js-vue-quantity', QuantityCounter)
new ComponentVue('.js-vue-app-order', AppOrder, true, { router: routerOrder })
new ComponentVue('.js-vue-app-lk', AppLk, true, { router: routerLk })
new ComponentVue('.js-vue-app-auth', AppAuth, true, { router: routerAuth })
