import QuantityCounter from '%vue%/components/QuantityCounter'
import Product from '%vue%/components/Product'
import Cart from '%vue%/components/Cart'
import ComponentVue from '%vue%/ComponentVue'
import AppOrder from '%vue%/views/AppOrder'
import AppLk from '%vue%/views/AppLk'
import routerOrder from '%vue%/router/order'
import routerLk from '%vue%/router/lk'

new ComponentVue('.js-vue-product', Product, false)
new ComponentVue('.js-vue-cart', Cart, false)
new ComponentVue('.js-vue-quantity', QuantityCounter)
new ComponentVue('.js-vue-app-order', AppOrder, true, { router: routerOrder })
new ComponentVue('.js-vue-app-lk', AppLk, true, { router: routerLk })
