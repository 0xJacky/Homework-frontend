export const cache = {
    namespace: true,
    state: {
        cache: {},
    },
    mutations: {
        update_cache(state, payload) {
            state.cache = Object.assign(state.cache, payload)
        }
    },
    actions: {
        update_cache({commit}, data) {
            commit('update_cache', data)
        }
    },
    getters: {
        cache(state) {
            return state.cache
        },
    }
}
