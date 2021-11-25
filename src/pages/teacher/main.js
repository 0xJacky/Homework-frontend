import Vue from 'vue'
import App from './App'
import api from '@/api'
import {router, routes} from './router'
import nprogress from '@/lib/nprogress'

import teacher_api from '@/api/teacher_api'
import Instance from '@/instance'

Vue.prototype.$routeConfig = routes
Vue.prototype.$server = process.env['VUE_APP_API_UPLOAD_ROOT']

Vue.prototype.$api = api
Vue.prototype.$api.teacher_api = teacher_api

router.beforeEach((to, from, next) => {
    nprogress.start()
    next()
})

router.afterEach(() => {
    nprogress.done()
})

new Instance(router, routes, App)
