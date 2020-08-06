import Vue from 'vue'
import {
    ruble,
    bonus,
    declOfNum,
    formatThousand,
    BONUS_TITLE,
    BOTTLE_TITLES,
    formatDate
} from '%common%/formatters'

Vue.filter('ruble', function (value) {
    return ruble(value) || 0
})

Vue.filter('thousand', function (value) {
    return formatThousand(value)
})

Vue.filter('bonus', function (value) {
    return bonus(value) || 0
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

Vue.filter('dateShort', function (value) {
    if (!value) return
    return formatDate(value)
})

Vue.filter('dateSlash', function (value) {
    if (!value) return
    return formatDate(value, '/')
})
