export default {
    items: getProducts()
}

function getProducts() {
    let products = []
    let id = 1
    while (id < 12) {
        products.push({
            id,
            title: '"Легенда жизни" 19л',
            price: 200
        })
        id++
    }
    return products
}
