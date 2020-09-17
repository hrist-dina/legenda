import SwiperBase from '%classes%/SwiperBase'

export default class SliderMain extends SwiperBase {
    constructor(selector = '.js-slider-main') {
        super(selector)
    }

    bindOptions() {
        this.screenWidth = false
        super.bindOptions({
            autoplay: {
                delay: 8000
            },
            speed: 600,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        })
    }

    init() {
        super.init()
        this.onParallaxInit()
    }

    onParallaxInit() {
        const items = document.querySelectorAll('.js-parallax')
        if (items) {
            items.forEach(i => this.onParallax(i))
        }
    }

    onParallax(item) {
        const img = item.querySelector('.js-parallax-img'),
            bg = item.querySelector('.js-parallax-bg'),
            maxMove = item.offsetWidth / 30,
            imgCenterX = img.offsetLeft + img.offsetWidth / 2,
            imgCenterY = img.offsetTop + img.offsetHeight / 2,
            fluidimg = window.matchMedia('(min-width: 726px)')

        function getMousePos(xRef, yRef) {
            let panelRect = item.getBoundingClientRect()
            return {
                x:
                    (Math.floor(xRef - panelRect.left) /
                        (panelRect.right - panelRect.left)) *
                    item.offsetWidth,
                y:
                    (Math.floor(yRef - panelRect.top) /
                        (panelRect.bottom - panelRect.top)) *
                    item.offsetHeight
            }
        }

        document.body.addEventListener('mousemove', function (e) {
            let mousePos = getMousePos(e.clientX, e.clientY),
                distX = mousePos.x - imgCenterX,
                distY = mousePos.y - imgCenterY
            if (fluidimg.matches) {
                img.style.transform =
                    'translate(' +
                    (-1 * distX) / 12 +
                    'px,' +
                    (-1 * distY) / 12 +
                    'px)'
                bg.style.transform = `translate(${(-1 * distX) / 70}px, ${
                    (-1 * distY) / 70
                }px)`
            }
        })
    }
}
