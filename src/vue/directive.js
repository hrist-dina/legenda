import Vue from 'vue'
import { ruble } from '%common%/formatters'

Vue.directive('ruble', {
    inserted: function (el) {
        el.textContent = ruble(el.innerText)
    }
})
