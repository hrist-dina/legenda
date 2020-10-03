import axios from 'axios'

export default class HTTP {
    constructor(url, data, successCallback, errorCallback) {
        this.url = url
        this.data = data

        this.successCallback = successCallback
        this.errorCallback = errorCallback
    }
    async request(method) {
        try {
            // TODO:: remove after release
            if (
                !isProd &&
                this.url === urlAjax.lkOrders &&
                this.data.page === 2
            ) {
                this.url = '/mock/lk-orders-2.json'
            }

            const response = await axios({
                method,
                url: this.url,
                [method === 'get' ? 'params' : 'data']: this.data
            })
            const { data } = response
            if (data.status) {
                this.successCallback ? this.successCallback(data.data) : ''
            } else {
                this.errorCallback ? this.errorCallback(data) : ''
            }
            return response
        } catch (error) {
            this.errorCallback ? this.errorCallback(error) : ''
            console.error(error)
        }
    }

    get() {
        return this.request('get')
    }

    post() {
        return this.request(isProd ? 'post' : 'get')
    }
}

export const isProd = process.env.NODE_ENV === 'production'

export const urlAjax = {
    location: isProd ? '/api/location' : '/mock/location.json',
    products: isProd ? '/api/products' : '/mock/products.json',
    filter: isProd ? '/api/filter' : '/mock/filter.json',
    basket: isProd ? '/api/basket' : '/mock/basket.json',
    basketAdd: isProd ? '/api/basket/add' : '/mock/basket-change.json',
    basketRemove: isProd ? '/api/basket/remove' : '/mock/basket-change.json',
    basketClean: isProd ? '/api/basket/clean' : '/mock/basket-change.json',
    basketPromocode: isProd ? '/api/basket/promocode' : '/mock/promocode.json',
    favoriteAdd: isProd ? '/api/favorite/add' : '/mock/favorite.json',
    favoriteRemove: isProd ? '/api/favorite/remove' : '/mock/favorite.json',
    favoriteClean: isProd ? '/api/favorite/clean' : '/mock/favorite.json',
    register: isProd ? '/api/register' : '/mock/register.json',
    editPersonalData: isProd ? '/api/person/edit' : '/mock/person-edit.json',
    login: isProd ? '/api/login' : '/mock/login.json',
    restore: isProd ? '/api/restore' : '/mock/restore.json',
    logout: isProd ? '/api/logout' : '/mock/logout.json',
    delivery: isProd ? '/api/delivery' : '/mock/delivery.json',
    // На проде будет один путь, запрос будет приходить с параметрами типа оплаты
    paymentCard: isProd ? '/api/payment' : '/mock/payment-card.json',
    paymentMoney: isProd ? '/api/payment' : '/mock/payment-money.json',
    lkOrders: isProd ? '/api/lk/orders' : '/mock/lk-orders.json',
    lkOrdersRepeat: isProd
        ? '/api/lk/orders/repeat'
        : '/mock/lk-orders-repeat.json',
    lkOrdersLast: isProd ? '/api/lk/orders/last' : '/mock/lk-orders-last.json'
}

export const PRODUCTS_AJAX = '.js-products-ajax'

export const setParams = data => {
    if (typeof data !== 'undefined' && typeof data !== 'object') {
        return
    }

    let url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)

    for (const key of Object.keys(data)) {
        if (data[key] == 0) {
            params.delete(key)
        } else {
            params.set(key, data[key])
        }
    }

    url.search = params
    url = url.toString()
    window.history.replaceState({ url: url }, null, url)
}
