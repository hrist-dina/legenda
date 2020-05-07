import QuantityCounter from '%vue%/components/QuantityCounter'
import Product from '%vue%/components/Product'
import Cart from '%vue%/components/Cart'
import ComponentVue from '%vue%/ComponentVue'

new ComponentVue('.js-vue-product', Product, false)
new ComponentVue('.js-vue-cart', Cart, false)
new ComponentVue('.js-vue-quantity', QuantityCounter)
