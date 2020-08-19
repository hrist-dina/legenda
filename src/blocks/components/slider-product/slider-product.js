import SwiperBase from '%classes%/SwiperBase'

export default class SliderProduct extends SwiperBase {
    constructor(selector = '.js-slider-product') {
        super(selector)
    }

    bindOptions() {
        this.nextEl = `${this.selector}-next`
        this.prevEl = `${this.selector}-prev`
        this.screenWidth = false
        super.bindOptions({
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: this.nextEl,
                prevEl: this.prevEl
            }
        })
    }
}
