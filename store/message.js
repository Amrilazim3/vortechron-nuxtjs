export const state = () => ({
    notifications: [],
});

export const actions = {
    addNotification({commit}, notification) {
        commit('pushNotification', notification);
        setTimeout(function () {
            commit('removeNotification', notification);
        }, 3000);
    },

    closeNotification({commit}, notification) {
        commit('removeNotification', notification)
    }
};

export const mutations = {
    pushNotification(state, notification) {
        state.notifications.push({
            ...notification,
            id: (Math.random().toString(36) + Date.now().toString(36)).substring(2)
        });
    },

    removeNotification(state, notificationToRemove) {
        state.notifications.splice(state.notifications.findIndex(noti => noti.id == notificationToRemove), 1);
    }
};