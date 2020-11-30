import { isProd } from '%common%/http'

export default class Init {
    constructor(store, data) {
        this.store = store
        this.data = data

        this.process()
    }

    process() {
        this.user()
        this.cart()
        this.cites()
        this.bottles()
        this.bottlesLimit()
        this.warningMessages()
    }

    user() {
        const user = this.data.user
        this.store.commit('user/setId', user && user.id ? user.id : null)

        this.store.commit(
            'user/setToken',
            user && user.token ? user.token : null
        )

        if (user && user.person) {
            this.store.commit('user/setPersonalData', user.person)
        } else {
            this.store.commit('user/cleanPersonData')
        }
    }

    cart() {
        const cart = this.data.cart
        if (cart && isProd) {
            this.store.commit('cart/addMany', cart)
        }
    }

    cites() {
        if (this.data.cities) {
            this.store.commit('common/setCities', this.data.cities)
        }
    }

    bottles() {
        if (this.data.bottles) {
            this.store.commit('cart/setBottles', this.data.bottles)
        }
    }

    bottlesLimit() {
        if (this.data.bottlesLimit) {
            this.store.commit('cart/setBottlesLimit', this.data.bottlesLimit)
        }
    }

    warningMessages() {
        if (this.data.cartWarningMessages) {
            this.store.commit(
                'cart/addWarningMessages',
                this.data.cartWarningMessages
            )
        }
    }
}
