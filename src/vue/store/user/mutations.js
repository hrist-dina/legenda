export default {
    setToken(state, payload) {
        state.token = payload.token
    },
    setPersonalData(state, payload) {
        state.person.fio = payload.fio
        state.person.email = payload.email
        state.person.phone = payload.phone
    }
}
