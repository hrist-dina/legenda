import HTTP, { urlAjax } from '%common%/http'
import router from '%vue%/router/order'
import { CHECKOUT_SUCCESS } from '%vue%/store/checkout/state'

export const token = localStorage.getItem('token')

export const sendPayment = async (state, dispatch, payload) => {
    const selectedPaymentType = state.selectPaymentType
    const type = selectedPaymentType ? selectedPaymentType.code : null
    const url = type === 'money' ? urlAjax.paymentMoney : urlAjax.paymentCard
    const response = await new HTTP(
        url,
        {
            ...payload,
            userId: state.id,
            token: state.token,
            paymentType: type || payload.paymentType
        },
        data => {
            if (data.order) {
                dispatch('cart/clean', null, { root: true }).then(() => {
                    const path = router.resolve({
                        name: CHECKOUT_SUCCESS,
                        params: { number: data.order }
                    })
                    // Делаем так, чтобы можно было сделать редирект из разных типов route (order, lk)
                    window.location = path.href
                })
            } else if (data.url) {
                // Делаем редирект на онлайн оплату
                window.location = data.url
            }
        }
    ).post()

    return response.data.status
}
