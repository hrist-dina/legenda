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
        state => state.favorite.favorites,
        newVal => {
            const cartFavorites = newVal
            localStorage.setItem(
                'cartFavorites',
                !!cartFavorites.length ? JSON.stringify(cartFavorites) : '[]'
            )
        }
    )
}
