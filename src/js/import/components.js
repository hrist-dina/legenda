import App from '%classes%/App'
import SliderProduct from '%components%/slider-product/slider-product'
import Mask from '%classes%/Mask'
import Map from '%components%/map/map'

new App().init(() => {
    new SliderProduct()
    new Mask().init()
    new Map()
})
