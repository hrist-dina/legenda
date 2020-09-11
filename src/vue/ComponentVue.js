import Vue from 'vue'
Vue.config.productionTip = false

import store from './store'

export default class ComponentVue {
    constructor(selector, component, needRender = true, options = {}) {
        this.selector = selector
        this.component = component
        this.needRender = needRender
        this.options = options

        this.init()
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initVue()
        })
    }

    initVue() {
        let options = this.options
        if (this.needRender) {
            options = { ...options, render: h => h(this.component) }
        } else {
            options = {
                ...options,
                ...this.component,
                render: false
            }
        }
        document.querySelectorAll(this.selector).forEach(node => {
            new Vue({
                store,
                ...options
            }).$mount(node)
        })
    }
}
