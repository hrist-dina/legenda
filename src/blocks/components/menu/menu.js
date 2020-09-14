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

        const arrow = this.menuItem?.querySelectorAll(this.classArrow)
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
        return this.menuItem?.querySelector(this.classHead)
    }

    get backItem() {
        return this.menuItem?.querySelector(this.classBack)
    }

    get titleItem() {
        return this.menuItem?.querySelector(this.classTitle)
    }

    get header() {
        return document.getElementById('header')
    }

    onClickMobileItem(e) {
        e.preventDefault()
        const target = e.target
        const item = target.closest(this.classItem)
        const text = item?.querySelector(this.classLink).textContent
        this.titleItem.innerText = text
        this.headItem.classList.remove('hide')
        const list = item.querySelector(this.classList)
        list.classList.add('active')
        list.setAttribute('data-title', text)
        const header = this.header
        if (header) {
            header.classList.add('menu-activated')
        }
    }

    onClickBack(e) {
        e.preventDefault()
        const lists = this.menuItem?.querySelectorAll(this.classList)
        const listActivated = [...lists].filter(i => {
            return [...i.classList].includes('active')
        })

        const countList = listActivated?.length
        if (countList) {
            listActivated[countList - 1].classList.remove('active')
            const prevItem = listActivated[countList - 2]
            if (prevItem) {
                this.titleItem.innerText = prevItem.dataset['title'] || ''
            }

            if (countList === 1) {
                this.titleItem.innerText = ''
                this.headItem.classList.add('hide')
                const header = this.header
                if (header) {
                    header.classList.remove('menu-activated')
                }
            }
        }
    }
}
