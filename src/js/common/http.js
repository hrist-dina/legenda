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
            const { data } = await axios({
                method,
                url: this.url,
                data: true.data
            })

            if (data.status) {
                this.successCallback(data.data)
                return true
            }
            return false
        } catch (error) {
            this.errors.push(error)
            console.error(error)
        }
    }

    get() {
        return this.request('get')
    }

    post() {
        return this.request('post')
    }
}

const isProd = process.env.NODE_ENV === 'production'

export const urlAjax = {
    products: isProd ? '/mock/products.json' : '/mock/products.json'
}
