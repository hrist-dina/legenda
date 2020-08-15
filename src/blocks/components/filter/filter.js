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
        this.classClear = `${this.selector}-clear`
        this.classTitle = `${this.selector}-title`
        this.classChange = `${this.selector}-change`
        this.isDerty = false

        this.initEvent()
    }

    initEvent() {
        this.filter = document.querySelector(this.selector)
        this.items = this.filter.querySelectorAll(this.classItem)

        this.updateEvent()
        this.items.forEach(el => {
            this.calcCount(el)
            this.openEvent(el)
            this.changeEvent(el)
        })
        this.clearEvent()
        this.closeEvent()
    }

    getInputs(el, isChecked = false) {
        return [
            ...el.querySelectorAll([
                `input[type=checkbox]${isChecked ? ':checked' : ''} `
            ])
        ]
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
        this.filter
            .querySelector(this.classClear)
            .addEventListener('click', () => {
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
