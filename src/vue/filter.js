import Vue from 'vue'
import {
    ruble,
    bonus,
    declOfNum,
    formatThousand,
    BONUS_TITLE,
    BOTTLE_TITLES
} from '%common%/formatters'

Vue.filter('ruble', function (value) {
    return ruble(value)
})

Vue.filter('thousand', function (value) {
    return formatThousand(value)
})

Vue.filter('bonus', function (value) {
    return bonus(value)
})

Vue.filter('bonusTitle', function (value) {
    return declOfNum(value, BONUS_TITLE)
})

Vue.filter('bottle', function (value) {
    return `${value} ${declOfNum(value, BOTTLE_TITLES)}`
})

Vue.filter('bottleTitle', function (value) {
    return declOfNum(value, BOTTLE_TITLES)
})
