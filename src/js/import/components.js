import App from '%classes%/App'
import SliderProduct from '%components%/slider-product/slider-product'
import SliderMain from '%components%/slider-main/slider-main'
import ProductListSlider from '%components%/product/product-list-slider'
import Mask from '%classes%/Mask'
import Map from '%components%/map/map'
import Filter from '%components%/filter/filter'
import Component from '%classes%/Component'
import Tabs, { SELECTOR_TABS } from '%classes%/Tabs'
import TabsScroll from '%classes%/TabsScroll'
import InfoCardSlider from '%components%/info-card/info-card-slider'
import Menu from '%components%/menu/menu'
import UiKit from '%components%/ui-kit/ui-kit'
import Gallery from '%components%/gallery/gallery'

new App().init(() => {
    new SliderProduct()
    new SliderMain()
    new ProductListSlider()
    new ProductListSlider('.js-product-recommendation-slider', {
        screenWidth: false,
        notHasInitArrow: true
    })
    new InfoCardSlider()
    new Mask().init()
    new Map()
    new Filter()
    new Component(SELECTOR_TABS, Tabs)
    new TabsScroll()
    new Menu()
    new UiKit()
    new Gallery()
})
