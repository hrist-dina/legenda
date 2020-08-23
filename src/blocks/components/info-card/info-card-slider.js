import SwiperBase from '%classes%/SwiperBase'

export default class InfoCardSlider extends SwiperBase {
    constructor(selector = '.js-info-card-slider', options) {
        super(selector, options)
    }

    bindOptions(options, item) {
        const childrenCount = item.querySelector('.swiper-wrapper').children
            .length
        let screenWidth = childrenCount > 3 ? false : 1200
        if (typeof this.options.screenWidth === 'boolean') {
            screenWidth = this.options.screenWidth
        }
        const nextEl = item.querySelector(`${this.selector}-next`)
        const prevEl = item.querySelector(`${this.selector}-prev`)
        this.screenWidth = screenWidth
        super.bindOptions(
            {
                ...options,
                navigation: {
                    nextEl,
                    prevEl
                }
            },
            item
        )
    }
}
