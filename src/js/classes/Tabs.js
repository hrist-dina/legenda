import ComponentBase from '%classes%/ComponentBase'

export const SELECTOR_TABS = '.js-tabs'

export default class Tabs extends ComponentBase {
    init() {
        const tab = SELECTOR_TABS
        this.classItem = `${tab}-item`
        this.classContent = `${tab}-content`

        this.initClick()
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
}
