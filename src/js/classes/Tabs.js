import ComponentBase from '%classes%/ComponentBase'
import { DOMAnimations } from '%common%/helper'

export const SELECTOR_TABS = '.js-tabs'

export default class Tabs extends ComponentBase {
    init() {
        const tab = SELECTOR_TABS
        this.classItem = `${tab}-item`
        this.classContent = `${tab}-content`
        this.classContentItem = `${this.classContent}-item`
        this.classToggle = `${tab}-toggle`
        this.classList = `${tab}-list`

        this.initClick()
        this.initToggle()
    }

    initClick() {
        const items = this.selector.querySelectorAll(this.classItem)
        if (!items) return
        items.forEach(item => {
            item.addEventListener('click', ({ target }) => {
                items.forEach(i => i.classList.remove('active'))
                const el = target.closest(this.classItem)
                el.classList.add('active')
                const content = this.selector.querySelector(this.classContent)
                const contentItems = [...content.children]
                contentItems.forEach(i => {
                    if (i.dataset['tab'] === el.dataset['tab']) {
                        i.classList.add('active')
                    } else {
                        i.classList.remove('active')
                    }
                })
            })
        })
    }

    initToggle() {
        const toggles = this.selector.querySelectorAll(this.classToggle)
        if (!toggles) return
        toggles.forEach(item => {
            item.addEventListener('click', ({ target }) => {
                const el = target.closest(this.classContentItem)
                DOMAnimations.slideToggle(el.querySelector(this.classList), 400)
                el.classList.toggle('active')
            })
        })
    }
}
