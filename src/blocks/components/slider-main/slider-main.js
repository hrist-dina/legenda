import SwiperBase from '%classes%/SwiperBase'

export default class SliderMain extends SwiperBase {
    constructor(selector = '.js-slider-main') {
        super(selector)
    }

    bindOptions() {
        this.screenWidth = false
        super.bindOptions({
            autoplay: {
                delay: 5000
            },
            speed: 600,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        })
    }
}
