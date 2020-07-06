export const initStoreWatch = store => {
    store.watch(
        state => state.cart.products,
        newVal => {
            const cartProducts = newVal
            localStorage.setItem(
                'cartProducts',
                !!cartProducts.length ? JSON.stringify(cartProducts) : '[]'
            )
        }
    )

    store.watch(
        state => state.user.token,
        newVal => {
            localStorage.setItem('token', JSON.stringify(newVal))
        }
    )

    store.watch(
        state => state.user.person,
        newVal => {
            localStorage.setItem('person', JSON.stringify(newVal))
        },
        {
            deep: true
        }
    )
}
