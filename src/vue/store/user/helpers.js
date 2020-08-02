export const token = localStorage.getItem('token')
export const deliveryItems = JSON.parse(localStorage.getItem('deliveryItems'))

export const getPersonFromStorage = person => {
    const fromStorage = JSON.parse(localStorage.getItem('person'))
    let data = {}
    for (let key in person) {
        data[key] = !person[key]
            ? fromStorage
                ? fromStorage[key]
                : ''
            : person[key]
    }
    return data
}
