import ComponentBase from '%classes%/ComponentBase'

export default class Menu extends ComponentBase {
    constructor(selector = '.js-menu') {
        super(selector)
    }

    init() {
        this.classArrow = `${this.selector}-arrow`
        this.classItem = `${this.selector}-item`
        this.classLink = `${this.selector}-link`
        this.classTitle = `${this.selector}-title`
        this.classHead = `${this.selector}-head`
        this.classBack = `${this.selector}-back`
        this.classList = `${this.selector}-list`

        const arrow = this.menuItem.querySelectorAll(this.classArrow)
        if (arrow) {
            arrow.forEach(item => {
                item.addEventListener(
                    'click',
                    this.onClickMobileItem.bind(this)
                )
            })
        }

        const back = this.backItem
        if (back) {
            back.addEventListener('click', this.onClickBack.bind(this))
        }
    }
    get menuItem() {
        return document.querySelector(this.selector)
    }

    get headItem() {
        return this.menuItem.querySelector(this.classHead)
    }

    get backItem() {
        return this.menuItem.querySelector(this.classBack)
    }

    get titleItem() {
        return this.menuItem.querySelector(this.classTitle)
    }

    onClickMobileItem(e) {
        e.preventDefault()
        const target = e.target
        const item = target.closest(this.classItem)
        this.titleItem.innerText = item.querySelector(
            this.classLink
        ).textContent
        this.headItem.classList.remove('hide')
        item.querySelector(this.classList).classList.add('active')
    }

    onClickBack(e) {
        e.preventDefault()
        this.titleItem.innerText = ''
        this.headItem.classList.add('hide')
        const lists = this.menuItem.querySelectorAll(this.classList)
        lists.forEach(item => item.classList.remove('active'))
    }
}
