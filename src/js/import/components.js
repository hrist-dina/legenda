import App from '%classes%/App'
import SliderProduct from '%components%/slider-product/slider-product'
import ProductListSlider from '%components%/product/product-list-slider'
import Mask from '%classes%/Mask'
import Map from '%components%/map/map'
import Filter from '%components%/filter/filter'
import Component from '%classes%/Component'
import Tabs, { SELECTOR_TABS } from '%classes%/Tabs'

new App().init(() => {
    new SliderProduct()
    new ProductListSlider()
    new ProductListSlider('.js-product-recommendation-slider', {
        screenWidth: false,
        notHasInitArrow: true
    })
    new Mask().init()
    new Map()
    new Filter()
    new Component(SELECTOR_TABS, Tabs)
})
