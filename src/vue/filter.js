import Vue from 'vue'
import { ruble, bonus, declOfNum } from '%common%/formatters'

Vue.filter('ruble', function (value) {
    return ruble(value)
})

Vue.filter('bonus', function (value) {
    return bonus(value)
})

Vue.filter('bottle', function (value) {
    return `${value} ${declOfNum(value, ['бутыль', 'бутыли', 'бутылей'])}`
})
