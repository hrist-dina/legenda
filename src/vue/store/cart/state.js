const cartProducts = localStorage.getItem('cartProducts')
export default {
    products:
        cartProducts && !!cartProducts.length ? JSON.parse(cartProducts) : [],
    processingId: [],
    isLoading: false,
    bottles: [], // Бутыли в личном кабинете в табе "Пополнить"
    bottlesLimit: [] // Бутыли в личном кабинете в табе "Списать"
}
