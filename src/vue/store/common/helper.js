export const showNotification = commit => data => {
    if (!commit) return
    if (!data.status && data) {
        commit('common/setNotification', data, {
            root: true
        })
    }
}

export const NOTIFICATION_SECONDS = 4000
