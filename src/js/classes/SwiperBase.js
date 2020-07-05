import Swiper from 'swiper'
import { debounce } from '%common%/helper'
import SliderProduct from '%components%/slider-product/slider-product'

export default class SwiperBase {
    constructor(selector, options = {}) {
        this.selector = selector
        this.screenWidht = 768 // При достижении этой точки включится слайдер из десктопа в мобильный
        this.atDesctopToMobile = true
        this.needRemoveStyles = true
        this.options = options

        this.instances = []

        this.init()
    }

    init() {
        document.querySelectorAll(this.selector).forEach(item => {
            this.bindOptions({}, item)
            this.instances.push({
                el: item,
                instance: this.initSwiper(item)
            })
        })
    }

    bindOptions(options, item) {
        const defaultOptions = {
            slidesPerView: 'auto'
        }
        this.options = { ...this.options, ...defaultOptions, ...options }
        return item
    }

    initSwiper(element) {
        if (!element) {
            element = this.selector
        }

        if (element || element.length) {
            if (!this.screenWidht) {
                console.log(this.options)
                return new Swiper(element, this.options)
            }

            let mySwiper = undefined

            window.addEventListener(
                'resize',
                debounce(
                    () => {
                        console.log('test test')
                        let screenWidth = window.innerWidth

                        const conditionOn = this.atDesctopToMobile
                            ? screenWidth <= this.screenWidht
                            : screenWidth >= this.screenWidht
                        const conditionOff = this.atDesctopToMobile
                            ? screenWidth > this.screenWidht
                            : screenWidth < this.screenWidht

                        if (conditionOn && mySwiper === undefined) {
                            mySwiper = new Swiper(element, this.options)
                        } else if (conditionOff && mySwiper !== undefined) {
                            mySwiper.destroy(true, false)
                            mySwiper = undefined

                            if (this.needRemoveStyles) {
                                element.removeAttribute('style')
                                element
                                    .querySelectorAll(
                                        '.swiper-slide:not(.cloned)'
                                    )
                                    .forEach(item =>
                                        item.removeAttribute('style')
                                    )
                            }
                        }
                    },
                    200,
                    false
                ),
                false
            )

            return mySwiper
        }
    }

    filterByInstance(el) {
        return this.instances.filter(instance => instance.el === el)[0]
            ?.instance
    }
}
