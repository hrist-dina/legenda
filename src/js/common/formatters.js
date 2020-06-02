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
