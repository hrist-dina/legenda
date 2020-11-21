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
        new Vivus('infographic-water', this.options, this.callbackDone)
        new Vivus('infographic-warranty', this.options, this.callbackDone)
        new Vivus('infographic-delivery', this.options, this.callbackDone)
        new Vivus('infographic-products', this.options, this.callbackDone)
    }

    callbackDone(node) {
        node.el.classList.add('done-draw')
    }
}
