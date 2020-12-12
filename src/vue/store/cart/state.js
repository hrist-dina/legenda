import { isProd } from '%common%/http'

const cartProducts = localStorage.getItem('cartProducts')
export default {
    products:
        !isProd && cartProducts && !!cartProducts.length
            ? JSON.parse(cartProducts)
            : [],
    cartBottles: [], // Доп. бутыли в корзине
    processingId: [],
    isLoading: false,
    bottles: [], // Бутыли в личном кабинете в табе "Пополнить"
    bottlesLimit: [], // Бутыли в личном кабинете в табе "Списать"
    warningMessages: [] // Уведомления в корзине
}
