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

export const checkEmail = string => {
    return !!string.search(/^[-._a-z0-9]+@+[a-z0-9-]+\.[a-z]{2,6}$/i)
}

export const checkPhone = string => {
    return !!string.search(
        /^\+7\s([0-9]{3})\s([0-9]{3})-([0-9]{2})-([0-9]{2})$/i
    )
}
