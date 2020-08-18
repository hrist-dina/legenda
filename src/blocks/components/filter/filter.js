import ComponentBase from '%classes%/ComponentBase'
import HTTP, { PRODUCTS_AJAX, setParams, urlAjax } from '%common%/http'
import ComponentVue from '%vue%/ComponentVue'
import Product from '%vue%/components/Product'
import { SELECTOR_PRODUCT } from '%vue%/component-selectors'

export default class Filter extends ComponentBase {
    constructor(selector = '.js-filter') {
        super(selector)
    }

    init() {
        this.classItem = `${this.selector}-item`
        this.classOpen = `${this.selector}-open`
        this.classOpenModal = `${this.selector}-open-modal`
        this.classClear = `${this.selector}-clear`
        this.classSend = `${this.selector}-send`
        this.classTitle = `${this.selector}-title`
        this.classChange = `${this.selector}-change`
        this.classWrap = `${this.selector}-wrap`
        this.classCloseModal = `${this.selector}-close-modal`
        this.classShow = `${this.selector}-show`
        this.isDerty = false

        this.initEvent()
    }

    initEvent() {
        this.filter = document.querySelector(this.selector)
        if (!this.filter) {
            return
        }
        this.items = this.filter.querySelectorAll(this.classItem)

        this.updateEvent()
        this.items.forEach(el => {
            this.calcCount(el)
            this.openEvent(el)
            this.changeEvent(el)
            this.showMoreEvent(el)
        })
        this.sendEvent()
        this.clearEvent()
        this.closeEvent()
        this.openModalEvent()
        this.closeModalEvent()
    }

    getInputs(el, isChecked = false) {
        const checked = isChecked ? ':checked' : ''
        return [...el.querySelectorAll([`input[type=checkbox]${checked}`])]
    }

    getData() {
        let data = {}
        this.items.forEach(item => {
            const checked = this.getInputs(item, true)
            if (checked.length) {
                data[item.dataset['type']] = checked.map(i =>
                    i.getAttribute('name')
                )
            }
        })
        return data
    }

    updateEvent() {
        this.eventUpdate = new Event('update')
        this.filter.addEventListener(
            'update',
            () => {
                const filterData = this.getData()
                const productsAjax = document.querySelector(PRODUCTS_AJAX)
                if (!productsAjax) {
                    console.error(
                        `Not set to html template class for ajax: ${PRODUCTS_AJAX}`
                    )
                    return
                }
                new HTTP(urlAjax.filter, filterData).get().then(({ data }) => {
                    if (data.status && data.html) {
                        productsAjax.innerHTML = data.html
                        new ComponentVue(
                            SELECTOR_PRODUCT,
                            Product,
                            false
                        ).initVue()
                        setParams(filterData)
                    }
                })
            },
            false
        )
    }

    closeEvent() {
        this.eventClose = new Event('close')
        document.addEventListener('click', ({ target }) => {
            const el = target.closest(this.classItem)
            if (!el) {
                this.items.forEach(i => i.classList.remove('active'))
                if (this.isDerty) {
                    this.filter.dispatchEvent(this.eventUpdate)
                }
            }
            this.isDerty = false
        })

        this.filter.addEventListener('close', () => {
            const wrap = this.filter.querySelector(this.classWrap)
            wrap.classList.remove('active')
            document.querySelector('body').classList.remove('o-hidden')
            if (this.isDerty) {
                this.filter.dispatchEvent(this.eventUpdate)
            }
            this.isDerty = false
        })
    }

    openModalEvent() {
        const open = this.filter.querySelector(this.classOpenModal)
        const wrap = this.filter.querySelector(this.classWrap)
        if (!open || !wrap) return
        open.addEventListener('click', () => {
            wrap.classList.add('active')
            document.querySelector('body').classList.add('o-hidden')
        })
    }

    closeModalEvent() {
        const close = this.filter.querySelector(this.classCloseModal)
        if (!close) return
        close.addEventListener('click', () => {
            this.filter.dispatchEvent(this.eventClose)
        })
    }

    showMoreEvent(el) {
        const show = el.querySelector(this.classShow)
        if (!show) return
        const text = show.querySelector('[data-text]')
        const hideText = text.dataset['text']
        const showText = text.textContent || text.innerText
        show.addEventListener('click', ({ target }) => {
            const item = target.closest(this.classItem)
            if (item.classList.contains('show-all')) {
                item.classList.remove('show-all')
                text.textContent = showText
            } else {
                item.classList.add('show-all')
                text.textContent = hideText
            }
        })
    }

    calcCount(el) {
        const inputs = this.getInputs(el, true)
        const count = inputs.length
        const title = el.querySelector(this.classTitle)
        title.dataset['count'] = count
        if (count > 0) {
            title.classList.add('has-count')
        } else {
            title.classList.remove('has-count')
        }
    }

    openEvent(el) {
        el.querySelector(this.classOpen).addEventListener(
            'click',
            ({ target }) => {
                const item = target.closest(this.classItem)
                item.style.minWidth = `${item.offsetWidth}px`
                item.classList.toggle('active')
            }
        )
    }

    clearEvent() {
        this.filter.querySelectorAll(this.classClear).forEach(el => {
            el.addEventListener('click', () => {
                this.items.forEach(item => {
                    const inputs = this.getInputs(item, true)
                    if (inputs.length) {
                        this.isDerty = true
                    }
                    inputs.forEach(i => (i.checked = false))
                    this.calcCount(item)
                })
                if (this.isDerty) {
                    this.filter.dispatchEvent(this.eventUpdate)
                }
                this.isDerty = false
            })
        })
    }

    sendEvent() {
        this.filter.querySelectorAll(this.classSend).forEach(el => {
            el.addEventListener('click', () => {
                this.filter.dispatchEvent(this.eventClose)
            })
        })
    }

    changeEvent(el) {
        const inputs = this.getInputs(el)
        inputs.forEach(el => {
            el.addEventListener('change', ({ target }) => {
                const item = target.closest(this.classItem)
                this.calcCount(item)
                this.isDerty = true
            })
        })
    }
}
