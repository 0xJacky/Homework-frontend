import Vue from 'vue'
import App from './App'
import api from '@/api'
import {router, routes} from './router'
import nprogress from '@/lib/nprogress'

import student_api from '@/api/student_api'
import Instance from '@/instance'

Vue.prototype.$api = api
Vue.prototype.$api.student_api = student_api

router.beforeEach((to, from, next) => {
    nprogress.start()
    next()
})

router.afterEach(() => {
    nprogress.done()
})

new Instance(router, routes, App)
