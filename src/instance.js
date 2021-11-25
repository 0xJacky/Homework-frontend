import Vue from 'vue'
import store from '@/lib/store'
import utils from '@/lib/utils'
import '@/lazy'
import '@/assets/css/dark.less'
import '@/assets/css/style.less'

class Instance {
    constructor(router, routes, App) {
        Vue.use(utils)
        Vue.prototype.$routeConfig = routes
        Vue.prototype.$server = process.env['VUE_APP_API_UPLOAD_ROOT']
        new Vue({
            render: h => h(App),
            router: router,
            store
        }).$mount('#app')
    }
}

export default Instance
