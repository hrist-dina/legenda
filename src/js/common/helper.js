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
        /^\+7\s\(([0-9]{3})\)\s([0-9]{3})\s([0-9]{2})-([0-9]{2})$/i
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
                resolve(true)
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

export const on = (selector, eventType, childSelector, eventHandler) => {
    const elements = document.querySelectorAll(selector)
    for (let element of elements) {
        element.addEventListener(eventType, eventOnElement => {
            if (eventOnElement.target.matches(childSelector)) {
                eventHandler(eventOnElement)
            }
        })
    }
}

export const smoothScroll = (target, duration, topPosition) => {
    const tg =
        typeof target === 'string' ? document.querySelector(target) : target
    const tgPositionOfTop = topPosition || tg.getBoundingClientRect().top
    const startPosition = window.pageYOffset
    const distance = tgPositionOfTop - startPosition
    let startTime = null

    function animationScroll(currentTime) {
        if (startTime === null) {
            startTime = currentTime
        }
        const timeElapsed = currentTime - startTime
        const run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animationScroll)
    }

    function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animationScroll)
}

export const scrollToElm = (container, elm, duration) => {
    function getRelativePos(elm) {
        const pPos = elm.parentNode.getBoundingClientRect(), // parent pos
            cPos = elm.getBoundingClientRect(), // target pos
            pos = {}

        pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop
        pos.right = cPos.right - pPos.right
        pos.bottom = cPos.bottom - pPos.bottom
        pos.left = cPos.left - pPos.left

        return pos
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    function scrollTo(element, to, duration, onDone) {
        let start = element.scrollTop,
            change = to - start,
            startTime = performance.now(),
            val,
            now,
            elapsed,
            t

        function animateScroll() {
            now = performance.now()
            elapsed = now - startTime
            t = elapsed / duration

            element.scrollTop = start + change * easeInOutQuad(t)

            if (t < 1) window.requestAnimationFrame(animateScroll)
            else onDone && onDone()
        }

        animateScroll()
    }

    const pos = getRelativePos(elm)
    scrollTo(container, pos.top, duration)
}

export const getCoords = elem => {
    const box = elem.getBoundingClientRect()

    const body = document.body
    const docEl = document.documentElement

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

    const clientTop = docEl.clientTop || body.clientTop || 0
    const clientLeft = docEl.clientLeft || body.clientLeft || 0

    const top = box.top + scrollTop - clientTop
    const left = box.left + scrollLeft - clientLeft

    return {
        top: top,
        left: left
    }
}
