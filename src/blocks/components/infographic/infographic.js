import Vivus from 'vivus'
import ComponentBase from '%classes%/ComponentBase'

export default class Infographic extends ComponentBase {
    constructor(selector) {
        super(selector)
    }

    get options() {
        return { type: 'oneByOne', duration: 150 }
    }

    init() {
        this.initItem('infographic-water')
        this.initItem('infographic-warranty')
        this.initItem('infographic-delivery')
        this.initItem('infographic-products')
    }

    initItem(id) {
        const node = document.getElementById(id)
        if (node) {
            new Vivus(id, this.options, this.callbackDone)
        }
    }

    callbackDone(node) {
        node.el.classList.add('done-draw')
    }
}
