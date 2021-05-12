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
            },
            on: {
                init: function () {
                    if (this.slides.length <= this.passedParams.loop ? 3 : 1) {
                        this.allowSlidePrev = this.allowSlideNext = false // disabling swiping
                        this.el
                            .querySelector('.swiper-button-prev')
                            .classList.add('hidden')
                        this.el
                            .querySelector('.swiper-button-next')
                            .classList.add('hidden')
                        this.el
                            .querySelector('.swiper-pagination')
                            .classList.add('hidden')
                    }
                }
            }
        })
    }
}
