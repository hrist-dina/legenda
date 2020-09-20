import ComponentBase from '%classes%/ComponentBase'

export default class UiKit extends ComponentBase {
    init() {
        new ButtonHover()
    }
}

class ButtonHover extends ComponentBase {
    constructor(
        selector = [
            '.button--back',
            '.button--for-bottle',
            '.button--bordered',
            '.button--bordered-md',
            '.button--in-cart:not(.in-cart)',
            '.button--in-cart-category:not(.in-cart)'
        ]
    ) {
        super(selector)
    }

    init() {
        const buttons = document.querySelectorAll(this.selector)
        buttons.forEach(item => {
            item.addEventListener('mouseover', ({ target }) => {
                const button = target.closest(this.selector)
                if (!button) return
                button.classList.add('on-hover')
                button.classList.remove('on-hover-reverse')
            })
            item.addEventListener('mouseout', ({ target }) => {
                const button = target.closest(this.selector)
                if (!button) return
                button.classList.remove('on-hover')
                button.classList.add('on-hover-reverse')
            })
        })
    }
}
