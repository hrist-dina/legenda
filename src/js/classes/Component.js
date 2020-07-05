export default class Component {
    constructor(selector, component) {
        this.selector = selector
        this.component = component

        this.init()
    }

    init() {
        document.querySelectorAll(this.selector).forEach(node => {
            new this.component(node)
        })
    }
}
