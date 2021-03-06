import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'
Swiper.use([Navigation, Pagination, Autoplay])
import { debounce } from '%common%/helper'

export default class SwiperBase {
    constructor(selector, options = {}) {
        this.selector = selector
        this.screenWidth = 768 // При достижении этой точки включится слайдер из десктопа в мобильный
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
                instance: this.initSwiper(item, this.options)
            })
        })
        window.dispatchEvent(new Event('resize'))
    }

    bindOptions(options, item) {
        const defaultOptions = {
            slidesPerView: 'auto'
        }
        this.options = { ...this.options, ...defaultOptions, ...options }
        return item
    }

    initSwiper(element, options) {
        if (!element) {
            element = this.selector
        }

        if (element || element.length) {
            if (!this.screenWidth) {
                return new Swiper(element, options)
            }

            let swiper = undefined
            window.addEventListener(
                'resize',
                debounce(
                    () => {
                        swiper = this.initHandler(swiper, element, options)
                    },
                    200,
                    false
                ),
                false
            )
            swiper = this.initHandler(swiper, element, options)
            return swiper
        }
    }

    initHandler(swiper, element, options) {
        let screenWidth = window.innerWidth

        const conditionOn = this.atDesctopToMobile
            ? screenWidth <= this.screenWidth
            : screenWidth >= this.screenWidth
        const conditionOff = this.atDesctopToMobile
            ? screenWidth > this.screenWidth
            : screenWidth < this.screenWidth

        if (conditionOn && swiper === undefined) {
            swiper = new Swiper(element, options)
        } else if (conditionOff && swiper !== undefined) {
            swiper.destroy(true, false)
            swiper = undefined

            if (this.needRemoveStyles) {
                element.removeAttribute('style')
                element
                    .querySelectorAll('.swiper-slide:not(.cloned)')
                    .forEach(item => item.removeAttribute('style'))
            }
        }

        return swiper
    }

    filterByInstance(el) {
        return this.instances.filter(instance => instance.el === el)[0]
            ?.instance
    }
}
