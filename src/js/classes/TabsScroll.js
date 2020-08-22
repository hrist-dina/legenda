import SwiperBase from '%classes%/SwiperBase'

export default class TabsScroll extends SwiperBase {
    constructor(selector = '.js-tabs-scroll') {
        super(selector)
    }

    bindOptions() {
        this.screenWidht = 1200
        super.bindOptions()
    }

    init() {
        super.init()

        this.instances.forEach(item => {
            let activeItem = item.el
                .querySelector('.active')
                .closest('.swiper-slide')
            const list = [...activeItem.parentElement.children]
            const index = list.indexOf(activeItem)
            if (index && item.instance) {
                item.instance.slideTo(index)
            }
        })
    }
}
