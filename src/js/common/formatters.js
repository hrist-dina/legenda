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
export const ruble = value => `${formatThousand(value)} ₽`
export const bonus = value => `${formatThousand(value)} ${declOfNum(value)}`

export const phoneReplaceForMask = value =>
    phoneReplace(value).replace(/[^\d]/g, '').slice(1)
