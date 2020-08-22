import SwiperBase from '%classes%/SwiperBase'

export default class InfoCardSlider extends SwiperBase {
    constructor(selector = '.js-info-card-slider', options) {
        super(selector, options)
    }

    bindOptions(options, item) {
        let screenWidth = 1200
        if (typeof this.options.screenWidth === 'boolean') {
            screenWidth = this.options.screenWidth
        }
        this.screenWidth = screenWidth
        super.bindOptions(options, item)
    }
}
