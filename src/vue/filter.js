import Vue from 'vue'
import { ruble } from '%common%/formatters'

Vue.filter('ruble', function (value) {
    if (!value) return ''
    return ruble(value)
})
