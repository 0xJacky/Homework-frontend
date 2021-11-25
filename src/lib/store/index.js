import Vue from 'vue'
import Vuex from 'vuex'
import {user} from './user'
import {mock} from './mock'
import {cache} from './cache'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['user', 'mock', 'cache']
})

export default new Vuex.Store({
    // 将各组件分别模块化存入 Store
    modules: {
        user, mock, cache
    },
    plugins: [vuexLocal.plugin],
    strict: debug
})
