export const debounce = (func, wait, immediate) => {
    let timeout
    return () => {
        const context = this,
            args = arguments
        const later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

export const toggleAdditionalProducts = (isHide = true) => {
    const classList = document.querySelector('.js-order-additional').classList
    isHide ? classList.add('hide') : classList.remove('hide')
}
