import SwiperBase from '%classes%/SwiperBase'

export default class ProductListSlider extends SwiperBase {
    constructor(selector = '.js-product-list-slider') {
        super(selector)
    }

    bindOptions(options, item) {
        this.classSection = `${this.selector}-section`
        const section = item.closest(this.classSection)
        if (!section) return
        const nextEl = section.querySelector(`${this.selector}-next`)
        const prevEl = section.querySelector(`${this.selector}-prev`)
        if (nextEl) {
            nextEl.classList.add('init')
        }
        if (prevEl) {
            prevEl.classList.add('init')
        }
        this.screenWidht = 1200
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
