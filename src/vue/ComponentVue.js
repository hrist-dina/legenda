import Vue from 'vue'
Vue.config.productionTip = false

import store from './store'
import { IS_VUE_MOUNT } from '%vue%/component-selectors'

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
        if (typeof this.selector === 'string') {
            document
                .querySelectorAll(this.selector)
                .forEach(node => this.initByNode(node, options))
        } else {
            this.initByNode(this.selector, options)
        }
    }

    initByNode(node, options) {
        node.classList.add(IS_VUE_MOUNT)
        new Vue({
            store,
            ...options
        }).$mount(node)
    }
}
