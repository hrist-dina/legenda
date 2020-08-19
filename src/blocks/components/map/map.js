/* global ymaps */

import { DOMAnimations } from '%common%/helper'

export default class Map {
    constructor(id, options) {
        this.map = id
        this.idZoomIn = 'zoom-in'
        this.idZoomOut = 'zoom-out'
        this.options = options
        this.classData = '.js-map-data'
        this.classDataItem = `${this.classData}-item`
        this.classDataItemToggle = `${this.classDataItem}-toggle`

        this.items = []

        this.init()
    }

    init() {
        this.initGetDataOptions()
    }

    initGetDataOptions() {
        document.querySelectorAll(this.classData).forEach(dataMap => {
            this.mapData(dataMap)
            document.querySelectorAll(this.classDataItem).forEach(item => {
                this.initEvents(item)
                this.items.push(this.itemData(item))
            })
            if (document.getElementById(this.map)) {
                this.initMap()
            }
        })
    }

    initEvents(el) {
        el.addEventListener('click', ({ target }) => {
            const node = target.closest(this.classDataItem)
            node.classList.toggle('active')
            DOMAnimations.slideToggle(
                node.querySelector(this.classDataItemToggle),
                400
            )
        })
    }

    mapData(map) {
        this.map = map.dataset['mapId']

        this.options = {
            center: [map.dataset['centerX'], map.dataset['centerY']],
            zoom: map.dataset['zoom']
        }
    }

    itemData(element) {
        return {
            locationX: element.dataset['locationX'],
            locationY: element.dataset['locationY'],
            hint: element.dataset['hint']
        }
    }

    isMobile() {
        return window.innerWidth <= 992
    }

    get zoomTemplate() {
        return (
            '<div class="map-zoom">' +
            `<div id='${this.idZoomIn}' class='plus'></div>` +
            `<div id='${this.idZoomOut}' class='minus'></div>` +
            '</div>'
        )
    }

    get controlOptions() {
        return {
            position: {
                top: this.isMobile() ? 25 : 45,
                right: this.isMobile() ? 15 : 35
            }
        }
    }

    get location() {
        return this.options.location
    }

    get center() {
        return this.options.center
    }

    get hint() {
        return this.options.hint
    }

    get zoom() {
        return this.options.zoom
    }

    destroyMap() {
        if (this.mapObject) {
            this.mapObject.destroy()
        }
    }

    initMap() {
        this.destroyMap()
        ymaps.ready().then(() => {
            try {
                let map = new ymaps.Map(this.map, {
                    center: this.center,
                    zoom: this.zoom,
                    controls: []
                })

                if (this.isMobile()) {
                    map.behaviors.disable('drag')
                }

                map.behaviors.disable('scrollZoom')

                let placemark = this.getPlaceMark()

                map.geoObjects.add(placemark)

                map.setBounds(placemark.getBounds()).then(function () {
                    if (map.getZoom() > 15) map.setZoom(15)
                })

                map.controls.add(this.initZoomControl(), this.controlOptions)
                this.mapObject = map
            } catch (e) {
                console.error(e)
            }
        })
    }

    getPlaceMark() {
        try {
            // Создадим коллекцию геообъектов.
            let collection = new ymaps.GeoObjectCollection(null, {
                // Запретим появление балуна.
                hasBalloon: false
            })

            // Добавляем метки с городами
            this.items.forEach(item => {
                collection.add(
                    this.createPlaceMark(
                        [item.locationX, item.locationY],
                        item.hint
                    )
                )
            })

            return collection
        } catch (e) {
            console.error(e)
        }
    }
    createPlaceMark(location = false, hint = false) {
        return new ymaps.Placemark(
            location ? location : this.location,
            {
                hintContent: hint ? hint : this.hint
            },
            {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: document.getElementById(this.map).dataset['img']
                    ? document.getElementById(this.map).dataset['img']
                    : 'img/map/placemark.svg',
                // Размеры метки.
                iconImageSize: [38, 52],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-19, -30]
            }
        )
    }

    initZoomControl() {
        const self = this

        // Создадим пользовательский макет ползунка масштаба.
        let ZoomLayout = ymaps.templateLayoutFactory.createClass(
            this.zoomTemplate,
            {
                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this)

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this)
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this)

                    // Начинаем слушать клики на кнопках макета.
                    document
                        .getElementById(self.idZoomIn)
                        .addEventListener('click', this.zoomInCallback)
                    document
                        .getElementById(self.idZoomOut)
                        .addEventListener('click', this.zoomOutCallback)
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    document
                        .getElementById(self.idZoomIn)
                        .removeEventListener('click', this.zoomInCallback)
                    document
                        .getElementById(self.idZoomOut)
                        .removeEventListener('click', this.zoomOutCallback)

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this)
                },

                zoomIn: function () {
                    var map = this.getData().control.getMap()
                    map.setZoom(map.getZoom() + 1, { checkZoomRange: true })
                },

                zoomOut: function () {
                    var map = this.getData().control.getMap()
                    map.setZoom(map.getZoom() - 1, { checkZoomRange: true })
                }
            }
        )
        return new ymaps.control.ZoomControl({
            options: { layout: ZoomLayout }
        })
    }
}
