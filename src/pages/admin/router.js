import Vue from 'vue'
import Router from 'vue-router'
import store from '@/lib/store'
import axios from 'axios'

const BaseRouterView = () => import('@/layouts/BaseRouterView')

Vue.use(Router)

export const routes = [
    {
        path: '/',
        component: () => import('@/layouts/BaseLayout'),
        redirect: 'dashboard',
        name: '首页',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/SuperUserDashBoard'),
                name: 'DashBoard',
                meta: {
                    icon: 'home'
                }
            },
            {
                path: 'user',
                name: '用户管理',
                meta: {icon: 'user'},
                redirect: '/user/list',
                component: BaseRouterView,
                children: [
                    {
                        path: 'add',
                        component: () => import('@/pages/admin/views/user/UserEdit'),
                        name: '添加用户'
                    },
                    {
                        path: 'list',
                        component: () => import('@/pages/admin/views/user/UserList'),
                        name: '用户列表'
                    }, {
                        path: ':id',
                        component: () => import('@/pages/admin/views/user/UserEdit'),
                        name: '用户编辑',
                        meta: {hiddenInSidebar: true}
                    }
                ]
            },
            {
                path: 'about',
                name: '关于',
                meta: {icon: 'info-circle'},
                component: () => import('@/views/other/About')
            }
        ]
    },
    {
        path: '/login',
        name: '超级用户登录',
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
    base: '/admin',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = 'Homework | ' + to.name

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

    if (to.meta.noAuth || store.getters.token && store.state.user.info.super_user === 1) {
        next()
    } else {
        Vue.prototype.$message.error('无权访问此页面')
        store.commit('logout')
        next({path: '/login', query: {next: to.fullPath}})
    }
})

export {router}
