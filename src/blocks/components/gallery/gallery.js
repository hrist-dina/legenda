import ComponentBase from '%classes%/ComponentBase'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

export default class Gallery extends ComponentBase {
    constructor(selector = '.js-gallery') {
        super(selector)
    }

    init() {
        // parse slide data (url, title, size ...) from DOM elements
        // (children of gallerySelector)
        let parseThumbnailElements = function (el) {
            let thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item

            for (let i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i] // <figure> element
                const list = figureEl.classList ? [...figureEl.classList] : []
                // include only element nodes
                if (
                    figureEl.nodeType !== 1 ||
                    list.includes('swiper-slide-duplicate-active') ||
                    (list.includes('swiper-slide-duplicate') &&
                        !list.includes('swiper-slide-active'))
                ) {
                    continue
                }

                linkEl = figureEl.children[0] // <a> element

                const type = figureEl.dataset.type

                size = linkEl.getAttribute('data-size')?.split('x')

                const src = linkEl.getAttribute('href')

                // create slide object
                if (type === 'video') {
                    item = {
                        html: wrapVideo(
                            `<video controls name="media" src='${src}'></video>`
                        )
                    }
                } else {
                    item = {
                        src
                    }
                }

                if (size) {
                    item.w = parseInt(size[0], 10)
                    item.h = parseInt(size[1], 10)
                }

                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src')
                }

                item.el = figureEl // save link to element for getThumbBoundsFn
                items.push(item)
            }

            return items
        }

        // find nearest parent element
        let closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn))
        }

        // triggers when user clicks on thumbnail
        let onThumbnailsClick = function (e) {
            e = e || window.event
            e.preventDefault ? e.preventDefault() : (e.returnValue = false)

            let eTarget = e.target || e.srcElement

            // find root element of slide
            let clickedListItem = closest(eTarget, function (el) {
                return el.tagName && el.tagName.toUpperCase() === 'FIGURE'
            })

            if (!clickedListItem) {
                return
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            let clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                nodeIndex = 0,
                index

            childNodes = [...childNodes].reduce((tot, i) => {
                const list = i.classList ? [...i.classList] : []
                if (
                    i.nodeType !== 1 ||
                    list.includes('swiper-slide-duplicate-active') ||
                    (list.includes('swiper-slide-duplicate') &&
                        !list.includes('swiper-slide-active'))
                ) {
                    return tot
                }
                tot.push(i)
                return tot
            }, [])

            let numChildNodes = childNodes.length

            for (let i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex
                    break
                }
                nodeIndex++
            }

            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery)
            }
            return false
        }

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        let photoswipeParseHash = function () {
            let hash = window.location.hash.substring(1),
                params = {}

            if (hash.length < 5) {
                return params
            }

            let lets = hash.split('&')
            for (let i = 0; i < lets.length; i++) {
                if (!lets[i]) {
                    continue
                }
                let pair = lets[i].split('=')
                if (pair.length < 2) {
                    continue
                }
                params[pair[0]] = pair[1]
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10)
            }

            return params
        }

        let openPhotoSwipe = function (
            index,
            galleryElement,
            disableAnimation,
            fromURL
        ) {
            let pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items

            items = parseThumbnailElements(galleryElement)

            // define options (if needed)
            options = {
                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function (index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    let thumbnail =
                            items[index].el.getElementsByTagName('img')[0] ||
                            items[index].el.getElementsByTagName('video')[0], // find thumbnail
                        pageYScroll =
                            window.pageYOffset ||
                            document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect()

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    }
                }
            }

            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (let j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j
                            break
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1
                }
            } else {
                options.index = parseInt(index, 10)
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(
                pswpElement,
                PhotoSwipeUI_Default,
                items,
                options
            )
            gallery.init()
        }

        // loop through all gallery elements and bind events
        let galleryElements = document.querySelectorAll(this.selector)

        for (let i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1)
            galleryElements[i].onclick = onThumbnailsClick
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        let hashData = photoswipeParseHash()
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(
                hashData.pid,
                galleryElements[hashData.gid - 1],
                true,
                true
            )
        }

        const wrapVideo = data =>
            `<div class='pswp__wrapper'><div class='pswp__wrapper-video'>${data}</div></div>`
    }
}
