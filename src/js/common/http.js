import axios from 'axios'

export default class HTTP {
    constructor(url, data, successCallback) {
        this.url = url
        this.data = data

        this.successCallback = successCallback

        this.errors = []
    }
    async request(method) {
        try {
            // TODO:: remove after release
            if (
                !isProd &&
                this.url == urlAjax.lkOrders &&
                this.data.page === 2
            ) {
                this.url = '/mock/lk-orders-2.json'
            }
            const response = await axios({
                method,
                url: this.url,
                [method === 'get' ? 'params' : 'data']: true.data
            })
            const { data } = response
            if (data.status) {
                this.successCallback ? this.successCallback(data.data) : ''
            }
            return response
        } catch (error) {
            this.errors.push(error)
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
    basketAdd: isProd ? '/api/basket/add' : '/mock/basket.json',
    basketRemove: isProd ? '/api/basket/remove' : '/mock/basket.json',
    basketClean: isProd ? '/api/basket/clean' : '/mock/basket.json',
    basketPromocode: isProd ? '/api/basket/promocode' : '/mock/promocode.json',
    favoriteAdd: isProd ? '/api/favorite/add' : '/mock/favorite.json',
    favoriteRemove: isProd ? '/api/favorite/remove' : '/mock/favorite.json',
    favoriteClean: isProd ? '/api/favorite/clean' : '/mock/favorite.json',
    register: isProd ? '/api/register' : '/mock/register.json',
    editPersonalData: isProd ? '/api/person/edit' : '/mock/person-edit.json',
    login: isProd ? '/api/login' : '/mock/login.json',
    logout: isProd ? '/api/logout' : '/mock/logout.json',
    delivery: isProd ? '/api/delivery' : '/mock/delivery.json',
    // На проде будет один путь, запрос будет приходить с параметрами типа оплаты
    paymentCard: isProd ? '/api/payment' : '/mock/payment-card.json',
    paymentMoney: isProd ? '/api/payment' : '/mock/payment-money.json',
    lkOrders: isProd ? '/api/lk/orders' : '/mock/lk-orders.json'
}
