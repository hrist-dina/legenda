const cartProducts = localStorage.getItem('cartProducts')
console.log(cartProducts)
export default {
    products:
        cartProducts && !!cartProducts.length ? JSON.parse(cartProducts) : [],
    processingId: []
}
