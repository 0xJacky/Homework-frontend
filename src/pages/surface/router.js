import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

export const routes = [
    {
        path: '/login',
        alias: '/',
        name: '用户登录',
        component: () => import('@/pages/surface/views/login/Login'),
        meta: {noAuth: true}
    },
    {
        path: '/refresh',
        name: 'refresh',
        component: () => import('@/views/other/Refresh')
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/pages/surface/views/logout/Logout')
    },
    {
        path: '/403',
        name: '403 Forbidden',
        component: () => import('@/views/other/Error'),
        meta: {noAuth: true, status_code: 403, error: 'Forbidden'}
    },
    {
        path: '/404',
        name: '404 Not Found',
        component: () => import('@/views/other/Error'),
        meta: {noAuth: true, status_code: 404, error: 'Not Found'}
    },
    {
        path: '*',
        name: '未找到页面',
        redirect: '/404',
        meta: {noAuth: true}
    }
]

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (process.env.NODE_ENV === 'production') {
        axios.get('/version.json?' + Date.now()).then(r => {
            if (!(process.env.VUE_APP_VERSION === r.data.version
                && Number(process.env.VUE_APP_BUILD_ID) === r.data.build_id)) {
                Vue.prototype.$info({
                    title: '系统信息',
                    content: '检测到版本更新，将会自动刷新本页',
                    onOk() {
                        location.reload()
                    },
                    okText: '好的'
                })
            }
        })
    }
    next()
})

export {router}
