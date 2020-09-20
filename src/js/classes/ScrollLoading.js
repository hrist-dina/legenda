import ComponentBase from '%classes%/ComponentBase'
import HTTP from '%common%/http'
import ComponentVue from '%vue%/ComponentVue'
import { SELECTOR_PRODUCT } from '%vue%/component-selectors'
import Product from '%vue%/components/Product'

export default class ScrollLoading extends ComponentBase {
    constructor(selector = '.js-scroll-loading') {
        super(selector)
    }
    init() {
        this.classData = `${this.selector}-data`
        this.classLoader = `${this.selector}-loader`

        this.initList()
    }

    initList() {
        const loadList = document.querySelectorAll(this.selector)

        loadList.forEach(i => this.initScrolling(i))
    }

    initScrolling(item) {
        const loader = item.querySelector(this.classLoader)
        const dataContent = item.querySelector(this.classData)
        let isLoading = false
        loader.classList.remove('loader')
        const url = loader.dataset.url
        document.addEventListener('scroll', () => {
            const dist = this.getDistFromBottom()
            if (!isLoading && dist) {
                isLoading = true
                loader.classList.add('loader')
                new HTTP(url).get().then(({ data }) => {
                    if (data.status && data.html) {
                        dataContent.insertAdjacentHTML('beforeend', data.html)
                        isLoading = false
                        loader.classList.remove('loader')
                        new ComponentVue(
                            SELECTOR_PRODUCT,
                            Product,
                            false
                        ).initVue()
                    }
                })
            }
        })
    }

    getDistFromBottom() {
        return (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 250
        )
    }
}
