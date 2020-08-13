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

export const pushToArray = (arr, obj) => {
    const index = arr.findIndex(e => e.id === obj.id)

    if (index === -1) {
        arr.push(obj)
    } else {
        arr[index] = obj
    }
}

export const DOMAnimations = {
    /**
     * SlideUp
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideUp: function (element, duration = 500) {
        return new Promise(function (resolve, reject) {
            element.style.height = element.offsetHeight + 'px'
            element.style.transitionProperty = 'height, margin, padding'
            element.style.transitionDuration = duration + 'ms'
            element.offsetHeight
            element.style.overflow = 'hidden'
            element.style.height = 0
            element.style.paddingTop = 0
            element.style.paddingBottom = 0
            element.style.marginTop = 0
            element.style.marginBottom = 0
            window.setTimeout(function () {
                element.style.display = 'none'
                element.style.removeProperty('height')
                element.style.removeProperty('padding-top')
                element.style.removeProperty('padding-bottom')
                element.style.removeProperty('margin-top')
                element.style.removeProperty('margin-bottom')
                element.style.removeProperty('overflow')
                element.style.removeProperty('transition-duration')
                element.style.removeProperty('transition-property')
                resolve(false)
            }, duration)
        })
    },

    /**
     * SlideDown
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideDown: function (element, duration = 500) {
        return new Promise(function (resolve, reject) {
            element.style.removeProperty('display')
            let display = window.getComputedStyle(element).display

            if (display === 'none') display = 'block'

            element.style.display = display
            let height = element.offsetHeight
            element.style.overflow = 'hidden'
            element.style.height = 0
            element.style.paddingTop = 0
            element.style.paddingBottom = 0
            element.style.marginTop = 0
            element.style.marginBottom = 0
            element.offsetHeight
            element.style.transitionProperty = 'height, margin, padding'
            element.style.transitionDuration = duration + 'ms'
            element.style.height = height + 'px'
            element.style.removeProperty('padding-top')
            element.style.removeProperty('padding-bottom')
            element.style.removeProperty('margin-top')
            element.style.removeProperty('margin-bottom')
            window.setTimeout(function () {
                element.style.removeProperty('height')
                element.style.removeProperty('overflow')
                element.style.removeProperty('transition-duration')
                element.style.removeProperty('transition-property')
            }, duration)
        })
    },

    /**
     * SlideToggle
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideToggle: function (element, duration = 500) {
        if (window.getComputedStyle(element).display === 'none') {
            return this.slideDown(element, duration)
        } else {
            return this.slideUp(element, duration)
        }
    }
}
