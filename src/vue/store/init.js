export default class Init {
    constructor(store, data) {
        this.store = store
        this.data = data

        this.process()
    }

    process() {
        this.user()
        this.cites()
        this.bottles()
        this.bottlesLimit()
    }

    user() {
        const user = this.data.user
        if (user && user.id) {
            this.store.commit('user/setId', user.id)
        }
        if (user && user.token) {
            this.store.commit('user/setToken', user.token)
        }

        if (user && user.person) {
            this.store.commit('user/setPersonalData', this.data.user.person)
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
}