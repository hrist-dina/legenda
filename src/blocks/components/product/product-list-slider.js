import SwiperBase from '%classes%/SwiperBase'

export default class ProductListSlider extends SwiperBase {
    constructor(selector = '.js-product-list-slider', options) {
        super(selector, options)
    }

    bindOptions(options, item) {
        this.classSection = `${this.selector}-section`
        const section = item.closest(this.classSection)
        if (!section) return
        const nextEl = section.querySelector(`${this.selector}-next`)
        const prevEl = section.querySelector(`${this.selector}-prev`)

        if (!this.options.notHasInitArrow) {
            if (nextEl) {
                nextEl.classList.add('init')
            }
            if (prevEl) {
                prevEl.classList.add('init')
            }
        }

        let screenWidth = 1200
        if (typeof this.options.screenWidth === 'boolean') {
            screenWidth = this.options.screenWidth
        }
        this.screenWidth = screenWidth
        super.bindOptions(
            {
                navigation: {
                    nextEl,
                    prevEl
                }
            },
            item
        )
    }
}
