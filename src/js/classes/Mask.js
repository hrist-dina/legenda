import Inputmask from 'inputmask'

export default class Mask {
    constructor(selector) {
        this.selector = selector
    }

    init() {
        new Mask('.js-mask-phone').phone()
    }

    phone() {
        new Inputmask({
            mask: '+7 (999) 999 99-99',
            showMaskOnHover: false,
            autoUnmask: true
        }).mask(this.selector)
    }
}
