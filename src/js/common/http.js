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
            const response = await axios({
                method,
                url: this.url,
                data: true.data
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
    products: isProd ? '/api/products' : '/mock/products.json',
    basketAdd: isProd ? '/api/basket/add' : '/mock/basket-add.json',
    basketRemove: isProd ? '/api/basket/remove' : '/mock/basket-remove.json',
    basketClean: isProd ? '/api/basket/clean' : '/mock/basket-clean.json',
    register: isProd ? '/api/register' : '/mock/register.json',
    auth: isProd ? '/api/auth' : '/mock/auth.json',
    delivery: isProd ? '/api/delivery' : '/mock/delivery.json',
    // На проде будет один путь, запрос будет приходить с параметрами типа оплаты
    paymentCard: isProd ? '/api/payment' : '/mock/payment-card.json',
    paymentMoney: isProd ? '/api/payment' : '/mock/payment-money.json'
}
