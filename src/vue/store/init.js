export default class Init {
    constructor(store, data) {
        this.store = store
        this.data = data

        this.process()
    }

    process() {
        this.cites()
    }

    cites() {
        if (this.data.cities) {
            this.store.commit('common/setCities', this.data.cities)
        }
    }
}
