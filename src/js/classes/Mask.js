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
            mask: '+7 999 999-99-99',
            showMaskOnHover: false
        }).mask(this.selector)
    }

    area() {
        new Inputmask({
            alias: 'numeric',
            allowMinus: false,
            rightAlign: false,
            showMaskOnHover: false,
            digits: 2,
            decimal: '.',
            max: 99999.99
        }).mask(this.elem)
    }

    date() {
        new Inputmask({
            alias: 'datetime',
            inputFormat: 'dd.mm.yyyy',
            placeholder: '__.__.____',
            showMaskOnHover: false
        }).mask(this.elem)
    }

    time() {
        new Inputmask({
            alias: 'datetime',
            inputFormat: 'HH:MM',
            placeholder: '__.__',
            showMaskOnHover: false
        }).mask(this.elem)
    }
}
