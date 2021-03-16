export const showNotification = commit => data => {
    if (!commit) return
    if (!data.status && data.error) {
        commit('common/setNotification', data.error, {
            root: true
        })
    }
}
