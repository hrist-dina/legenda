import SwiperBase from '%classes%/SwiperBase'

export default class ProductListSlider extends SwiperBase {
    constructor(selector = '.js-product-list-slider') {
        super(selector)
    }

    bindOptions(options, item) {
        this.classSection = `${this.selector}-section`
        this.nextEl = `${this.selector}-next`
        this.prevEl = `${this.selector}-prev`
        this.screenWidht = false
        super.bindOptions(
            {
                navigation: {
                    nextEl: this.nextEl,
                    prevEl: this.prevEl
                },
                on: {
                    init: () => {
                        const section = item.closest(this.classSection)
                        section.querySelector(this.nextEl).classList.add('init')
                        section.querySelector(this.prevEl).classList.add('init')
                    }
                }
            },
            item
        )
    }
}
