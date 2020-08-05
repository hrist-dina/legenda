export const showNotification = commit => data => {
    if (!data.status && data.error) {
        commit('common/setNotification', data.error, {
            root: true
        })
    }
}
