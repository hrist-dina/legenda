import { parseDate } from '%common%/helper'

export const BONUS_TITLE = ['бонус', 'бонуса', 'бонусов']

export const BOTTLE_TITLES = ['бутыль', 'бутыли', 'бутылей']

/**
 * Склонение
 * @param n number
 * @param titles array варианты склонений [для одного, для двух-четырёх, больше четырёх]
 * @returns {*}
 */
export const declOfNum = (n, titles) => {
    let cases = [2, 0, 1, 1, 1, 2]
    return titles[
        n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]
    ]
}
export const formatThousand = number =>
    String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
export const phoneReplace = value => value.replace(/[^\d+]/g, '')
export const ruble = value => `${formatThousand(decimal(value))} ₽`
export const decimal = value =>
    value % 1 !== 0 ? parseFloat(value).toFixed(1) : value
export const bonus = value =>
    `${formatThousand(value)} ${declOfNum(value, BONUS_TITLE)}`

export const phoneReplaceForMask = value => {
    const newVal = phoneReplace(value).replace(/[^\d]/g, '')
    if (newVal.length > 10) {
        return newVal.slice(1)
    }
    return newVal
}

export const formatDate = (value, separator = '.') => {
    const date = new Date(value)
    let dd = date.getDate()
    if (dd < 10) dd = '0' + dd

    let mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm

    let yy = date.getFullYear()

    return `${dd}${separator}${mm}${separator}${yy}`
}

export const formatDateToServer = date => {
    if (!date) return date
    let d
    if (typeof date === 'string') {
        d = parseDate(date)
    } else {
        d = new Date(date)
    }

    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [year, month, day].join('-')
}

export const formatPhoneNumber = phone => {
    const cleaned = ('' + phone).replace(/\D/g, '')
    const match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
        const intlCode = '+7 '
        return [
            intlCode,
            '(',
            match[2],
            ') ',
            match[3],
            '-',
            match[4],
            '-',
            match[5]
        ].join('')
    }
    return null
}

export const getDeliveryLabel = delivery => {
    const city =
        delivery.city && delivery.city.name ? `${delivery.city.name}, ` : ''
    return city + delivery.address
}
