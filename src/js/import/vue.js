import QuantityCounter from '%vue%/components/QuantityCounter'
import Product from '%vue%/components/Product'
import Cart from '%vue%/components/Cart'
import ComponentVue from '%vue%/ComponentVue'

import AppOrder from '%vue%/views/AppOrder'
import routerOrder from '%vue%/router/order'

new ComponentVue('.js-vue-product', Product, false)
new ComponentVue('.js-vue-cart', Cart, false)
new ComponentVue('.js-vue-quantity', QuantityCounter)
new ComponentVue('.js-vue-app-order', AppOrder, true, { router: routerOrder })
