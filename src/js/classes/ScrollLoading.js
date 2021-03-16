import ComponentBase from '%classes%/ComponentBase'
import HTTP from '%common%/http'
import ComponentVue from '%vue%/ComponentVue'
import { SELECTOR_PRODUCT } from '%vue%/component-selectors'
import Product from '%vue%/components/Product'
import UiKit from '%components%/ui-kit/ui-kit'

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
        if (!loader) {
            return
        }
        const dataContent = item.querySelector(this.classData)
        let isLoading = false
        let isEnd = false
        loader.classList.remove('loader')
        let url = loader.dataset.url
        document.addEventListener('scroll', () => {
            let dist = this.getDistFromBottom()
            if (!isLoading && !isEnd && dist) {
                isLoading = true
                loader.classList.add('loader')
                new HTTP(url).get().then(({ data }) => {
                    if (data.status && data.html) {
                        dataContent.insertAdjacentHTML('beforeend', data.html)
                        isLoading = false
                        loader.classList.remove('loader')
                        this.reInitEvents()

                        if (data.nextPageUrl) {
                            url = data.nextPageUrl
                        } else {
                            isEnd = true
                        }
                    }
                })
            }
        })
    }

    reInitEvents() {
        new ComponentVue(SELECTOR_PRODUCT, Product, false).initVue()
        new UiKit()
    }

    getDistFromBottom() {
        return (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 250
        )
    }
}
