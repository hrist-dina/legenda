import LazyLoad from 'vanilla-lazyload'

const eventUpdate = 'lazyload.update'

export default class Lazy {
    constructor() {
        this.lazyload = new LazyLoad()
        this.init()
    }

    static dispatchUpdate() {
        document.dispatchEvent(new CustomEvent(eventUpdate))
    }

    init() {
        document.addEventListener(eventUpdate, () => {
            this.lazyload.update()
        })
    }
}
