import Vue from 'vue'
import Router from 'vue-router'
import store from '@/lib/store'
import axios from 'axios'
import nprogress from '@/lib/nprogress'

Vue.use(Router)

export class InstanceRouter {
    routes = null
    router = null

    constructor(base, packageRoutes, power) {
        const r = routes(packageRoutes)
        this.routes = r
        this.router = new Router({
            mode: 'history',
            base: base,
            routes: r
        })
        this.router.beforeEach((to, from, next) => {
            nprogress.start()
            next()
        })

        this.router.afterEach(() => {
            nprogress.done()
        })

        this.router.beforeEach((to, from, next) => {
            document.title = 'Homework | ' + to.name

            if (process.env.NODE_ENV === 'production') {
                axios.get('/version.json?' + Date.now()).then(r => {
                    if (!(process.env.VUE_APP_VERSION === r.data.version
                        && Number(process.env.VUE_APP_BUILD_ID) === r.data.build_id)) {
                        Vue.prototype.$info({
                            title: 'Homework',
                            content: '检测到版本更新，将会自动刷新本页',
                            onOk() {
                                location.reload()
                            },
                            okText: '好的'
                        })
                    }
                })
            }

            if (to.meta.noAuth || store.getters.token && power === store.state.user.power) {
                next()
            } else if (!store.getters.token) {
                next({path: '/login', query: {next: to.fullPath}})
            } else if (power !== store.state.user.power) {
                next({path: '/403'})
            }
        })
    }

}

const routes = (packageRoutes) => [
    {
        path: '/',
        component: () => import('@/layouts/BaseLayout'),
        redirect: 'dashboard',
        name: '首页',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/DashBoard'),
                name: '仪表盘',
                meta: {
                    //hiddenHeaderContent: true,
                    icon: 'home'
                }
            },
            {
                path: 'user_info',
                component: () => import('@/views/user_info/UserInfo'),
                name: '个人信息',
                meta: {
                    icon: 'form'
                }
            },
            ...packageRoutes,
            {
                path: 'about',
                component: () => import('@/views/other/About'),
                name: '关于',
                meta: {
                    icon: 'info-circle'
                }
            }
        ]
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
