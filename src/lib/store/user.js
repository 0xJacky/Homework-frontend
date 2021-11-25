export const user = {
    namespace: true,
    state: {
        info: {
            id: null,
            name: null,
            power: null,
            college_id: null,
            college: {},
            major_id: null,
            major: {},
            job_title: null
        },
        token: null,
        power: null,
        current: -1
    },
    mutations: {
        async login(state, payload) {
            state.token = payload.token
        },
        logout(state) {
            //state.live?.close()
            sessionStorage.clear()
            state.info = {
                id: null,
                name: null,
                power: null,
                college_id: null,
                college: {},
                major_id: null,
                major: {},
                job_title: null
            }
            state.token = null
            state.power = null
            state.current = -1
        },
        update_user(state, payload) {
            state.info = Object.assign(state.info, payload)
        },
        update_power(state, payload) {
            state.power = payload.power
        },
        update_current(state, {current}) {
            state.current = current
        }
    },
    actions: {
        async login({commit}, data) {
            commit('login', data)
        },
        async logout({commit}) {
            commit('logout')
        },
        async update_user({commit}, data) {
            commit('update_user', data)
        },
        async update_power({commit}, data) {
            commit('update_power', data)
        },
        async update_current({commit}, data) {
            commit('update_current', data)
        }
    },
    getters: {
        info(state) {
            return state.info
        },
        token(state) {
            return state.token
        },
        power(state) {
            return state.power
        },
        isLogin(state) {
            return !!state.token
        },
        current(state) {
            return Number(state.current)
        }
    }
}
