import App from '%classes%/App'
import SliderProduct from '%components%/slider-product/slider-product'
import Mask from '%classes%/Mask'

new App().init(() => {
    new SliderProduct()
    new Mask().init()
})
