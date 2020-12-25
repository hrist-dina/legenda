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
        this.cartBottle()
        this.cites()
        this.bottles()
        this.bottlesLimit()
        this.warningMessages()
    }

    user() {
        const user = this.data.user
        this.store.commit('user/setId', user && user.id ? { id: user.id } : '')

        this.store.commit(
            'user/setToken',
            user && user.token ? { token: user.token } : ''
        )

        if (user && user.person) {
            this.store.commit('user/setPersonalData', user.person)
        } else {
            this.store.commit('user/cleanPersonData')
        }

        if (this.data.selectType) {
            this.store.commit('user/setSelectType', { selectType: true })
        }

        if (this.data.needEmail) {
            this.store.commit('user/setNeedEmail', { needEmail: true })
        }

        if (this.data.message) {
            this.store.commit('user/setMessage', { message: this.data.message })
        }

        if (this.data.disabledBeforeDateDelivery) {
            this.store.commit(
                'user/setDisabledBeforeDateDelivery',
                this.data.disabledBeforeDateDelivery
            )
        }

        if (user && user.wish) {
            this.store.commit('favorite/concat', user.wish)
        }

        if (user && user.address) {
            if (user.address.home) {
                user.address.home.map(i =>
                    this.store.commit('user/setDeliveryItem', i)
                )
            }
            if (user.address.office) {
                user.address.office.map(i =>
                    this.store.commit('user/setDeliveryItem', i)
                )
            }
        }
    }

    cart() {
        const cart = this.data.cart
        if (cart && isProd) {
            this.store.commit('cart/addMany', cart)
        }
    }

    cartBottle() {
        const cartBottle = this.data.cartBottle
        if (cartBottle) {
            this.store.commit('cart/setCartBottles', cartBottle)
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
