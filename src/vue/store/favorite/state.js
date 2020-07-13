const cartFavorites = localStorage.getItem('cartFavorites')
export default {
    favorites:
        cartFavorites && !!cartFavorites.length
            ? JSON.parse(cartFavorites)
            : [],
    processingFavoritesId: []
}
